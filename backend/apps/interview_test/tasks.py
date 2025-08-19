from celery import shared_task
from django.core.cache import cache
from apps.interview_test.models.test_aptitude_models import Question
from django.contrib.auth import get_user_model
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.utils import timezone
from django.template.loader import render_to_string



from apps.interview_test.models.aptitude_test_result_model import AptitudeTestResult
from apps.interview_test.models.test_aptitude_models import Question

@shared_task
def grade_answer(session_id, question_id, user_answer):
    try:
        question = Question.objects.get(id=question_id)
        is_correct = (question.correct.options == user_answer)
        result_obj = AptitudeTestResult.objects.get(session_id=session_id)
        if result_obj.results is None:
            result_obj.results = {}
            result_obj.results[question_id] = {
                'answer': user_answer,
                'correct': is_correct,
                'status': 'answered'
                } 
        result_obj.save()
        return f"Graded Q:{question_id} for session:{session_id}. Correct: {is_correct}"
    
    except Question.DoesNotExist:
        return f"Error: Question with ID {question_id} not found."
    except AptitudeTestResult.DoesNotExist:
        return f"Error: Test session {session_id} not found." 

@shared_task
def log_unanswered_question(session_id, question_id):
    try:
        result_obj = AptitudeTestResult.objects.get(session_id=session_id)
        
        if result_obj.results is None:
            result_obj.results = {}

        result_obj.results[question_id] = {
            'answer': None, # No answer was submitted
            'correct': False, 
            'status': 'unanswered' # Explicitly mark as unanswered
        }
        result_obj.save()
        return f"Logged unanswered Q:{question_id} for session:{session_id}"
    except AptitudeTestResult.DoesNotExist:
        return f"Error: Test session {session_id} not found."
    
@shared_task
def send_result_email(user_id, score):
    User = get_user_model()
    try:
        user = User.objects.get(id=user_id)
        subject = "Your Aptitude Test Results"
        from_email = settings.DEFAULT_FROM_EMAIL
        to_email = [user.email]

        context = {
            'user':user,
            'score':score,
        }
        text_content = render_to_string('interview_test/emails/result_email.txt', context)
        html_message = render_to_string('interview_test/emails/result_email.html', context)
        msg = EmailMultiAlternatives(subject, text_content, from_email, to_email)
        msg.attach_alternative(html_message, "text/html")
        msg.send()
        print(f"Successfully sent result email to {user.email}")
        return f'Email sent to {user.email}'
    except User.DoesNotExist as error:
        print(f"Error: Could not find User with ID {user_id} to send email.")
        return f"User with ID {user_id} not found."
    
@shared_task
def finalize_test_result(session_id):
    try:
        result_obj = AptitudeTestResult.objects.get(session_id=session_id)
        if result_obj.status == 'completed':
            return f"Test for session {session_id} has already been finalized."
        results_data = result_obj.results
        if not results_data:
            final_score = 0
        else:
            correct_answers = 0
            for question_result in results_data.value():
                if question_result.get('correct') is True:
                    correct_answers += 1
                total_questions = len(results_data)
                final_score = (correct_answers / total_questions) * 100 if total_questions > 0 else 0

        result_obj.final_score = final_score
        result_obj.status = 'completed'
        result_obj.completed_at = timezone.now()
        result_obj.save()
        send_result_email(result_obj.student.id, final_score)
        print(f"Finalized test for {session_id}. Final Score: {final_score:.2f}%. Email task queued.")
        return f"Finalized test for {session_id}. Final Score: {final_score:.2f}%"
    except AptitudeTestResult.DoesNotExist:
        print(f"Error: Could not find AptitudeTestResult for session {session_id} to finalize.")
        return f"Error: Could not find result for session {session_id}"

