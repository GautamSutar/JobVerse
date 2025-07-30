from apps.job_applications.models.jobApplicationModel import JobApplications
from django.db import models

class ScheduleInterviewsModel(models.Model):
    job_applications = models.OneToOneField(JobApplications, null=True, blank=True, on_delete=models.CASCADE, related_name='interview')  
    interview_link = models.URLField()
    scheduled_time = models.DateTimeField()
    is_completed = models.BooleanField(default=False)
    ai_feedback = models.TextField(blank=True, null=True)
    ai_score = models.FloatField(blank=True, null=True)
    
    def __str__(self):
        return f"Interview for {self.job_applications.student.email}"
    