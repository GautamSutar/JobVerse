from django.core.mail import send_mail, EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from django.contrib.auth.hashers import make_password
def send_application_confirmation_email(student_email, student_name, job_title):
    """Sends the universal confirmation email to any student who applies."""
    
    # Context data to pass to the HTML template
    context = {
        'student_name': student_name,
        'job_title': job_title,
    }
    
    # Render both the HTML and a plain text version for email clients that don't support HTML
    html_body = render_to_string('emails/application_confirmation.html', context)
    text_body = f"Hi {student_name},\n\nCongratulations! You have successfully applied for the position of '{job_title}'.\n\nOur team will review your application and you will be notified if you are shortlisted for the next steps.\n\nBest Regards,\nThe Job Verse Team"

    # Use EmailMultiAlternatives to send both HTML and text versions
    msg = EmailMultiAlternatives(
        subject=f"Application Received: {job_title} | Job Verse",
        body=text_body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[student_email]
    )
    msg.attach_alternative(html_body, "text/html")
    msg.send(fail_silently=False)


def send_interview_schedule_email(student_email, student_name, hr_name, company_name, job_title, interview_link, scheduled_time):
    """Sends the detailed interview schedule email to shortlisted candidates."""

    context = {
        'student_name': student_name,
        'hr_name': hr_name,
        'company_name': company_name,
        'job_title': job_title,
        'interview_link': interview_link,
        'scheduled_time_formatted': scheduled_time.strftime('%A, %B %d, %Y at %I:%M %p %Z'),
    }

    html_body = render_to_string('emails/interview_schedule.html', context)
    text_body = f"""
Hi {student_name},

My name is {hr_name}, and I'm from {company_name}.
Congratulations! We are pleased to invite you to an AI-powered interview for the {job_title} position.

Interview Details:
- Your unique AI interview link: {interview_link}
- Scheduled Time: {scheduled_time.strftime('%A, %B %d, %Y at %I:%M %p')}

IMPORTANT RULES:
1. Camera is Mandatory.
2. No Cheating (no tab switching, phones, or assistance).
3. Violation of these rules will result in immediate disqualification.

Best of luck!
Sincerely,
{hr_name}
{company_name}
    """

    msg = EmailMultiAlternatives(
        subject=f"Interview Scheduled for {job_title} at {company_name}",
        body=text_body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[student_email]
    )
    msg.attach_alternative(html_body, "text/html")
    msg.send(fail_silently=False)