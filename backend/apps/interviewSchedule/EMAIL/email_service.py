from django.core.mail import send_mail
from django.conf import settings

def send_application_confirmation_email(student_email, student_name, job_title):
    """Sends the universal confirmation email to any student who applies."""
    send_mail(
        subject=f"Application Received: {job_title} | Job Verse",
        message=f"Hi {student_name},\n\nCongratulations! You have successfully applied for the position of '{job_title}'.\n\nOur team will review your application and you will be notified if you are shortlisted for the next steps.\n\nBest Regards,\nThe Job Verse Team",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[student_email],
        fail_silently=False
    )

def send_interview_schedule_email(student_email, student_name, hr_name, company_name, job_title, interview_link, scheduled_time):
    """Sends the detailed interview schedule email to shortlisted candidates."""
    email_body = f"""
Hi {student_name},

My name is {hr_name}, and I'm from {company_name}.

Congratulations! After reviewing your application for the {job_title} position, we are pleased to invite you to the next round: an AI-powered interview.

Please be prepared and ensure your availability at the scheduled time.

**Interview Details:**
- Your unique AI interview link: {interview_link}
- Scheduled Time: {scheduled_time.strftime('%A, %B %d, %Y at %I:%M %p')}

**--- VERY IMPORTANT: INTERVIEW RULES ---**
1.  **Camera is Mandatory:** Your camera must be turned on and remain active throughout the entire interview. This is a very strict requirement.
2.  **No Cheating:** Do not switch browser tabs, use your phone, or receive assistance from others. Our system monitors for such activity.
3.  **Disqualification:** Any violation of these rules will result in your immediate disqualification from the hiring process.

We wish you the very best of luck!

Sincerely,
{hr_name}
{company_name}
    """
    send_mail(
        subject=f"Interview Scheduled for {job_title}",
        message=email_body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[student_email],
        fail_silently=False
    )