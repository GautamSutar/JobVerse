from celery import shared_task
from apps.interview_test.models.aptitude_test_result import AptitudeTestResult
from django.core.cache import cache
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