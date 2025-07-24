from django.core.mail import send_mail
from django.conf import settings

def send_application_confirmation(student_email, student_name, job_title):
    subject = f"🎉 You Successfully Applied for {job_title}!"
    plain_message = f"Hi {student_name}, you've successfully applied to {job_title}. Thank you for using JobVerse. Wait for HR to respond."
    
    html_message = f"""
    <html>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; background-color: #f0f4f8;">
        <div style="max-width: 650px; margin: 20px auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
            
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: #4CAF50;">🎉 Congratulations, {student_name}!</h2>
                <h4 style="color: #333;">You’ve Applied for: <span style="color: #007bff;">{job_title}</span></h4>
            </div>

            <p style="font-size: 16px; color: #444;">
                Thank you for applying through <strong>JobVerse</strong>. Your application has been successfully received and is now being reviewed by the HR team.
            </p>

            <p style="font-size: 16px; color: #444;">
                📌 <strong>What’s Next?</strong><br>
                Our HR team will evaluate your resume and, if shortlisted, you’ll receive an email invitation to attend an <strong>AI-based interview</strong>.
            </p>

            <p style="font-size: 16px; color: #444;">
                🧠 <strong>Tips:</strong><br>
                • Keep an eye on your inbox for interview scheduling<br>
                • Prepare based on the skills listed in the job description<br>
                • Be confident — we believe in you!
            </p>

            <div style="margin-top: 30px; background: #f8f9fa; padding: 20px; border-left: 5px solid #4CAF50;">
                <p style="margin: 0; color: #555;">
                    💡 Pro Tip: Complete your profile and add more project links to improve visibility.
                </p>
            </div>

            <p style="margin-top: 40px; color: #888; font-size: 14px; text-align: center;">
                🚀 Thanks again for choosing <strong>JobVerse</strong>. We wish you the best in your job hunt!
                <br><br>
                — The JobVerse Team
            </p>
        </div>
    </body>
    </html>
    """

    send_mail(
        subject=subject,
        message=plain_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[student_email],
        html_message=html_message,
        fail_silently=False
    )
