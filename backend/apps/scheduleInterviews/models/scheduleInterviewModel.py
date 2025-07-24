from apps.users.models import CustomUser
from apps.jobs.models.jobsModel import Job
from django.db import models

class ScheduleInterviewsModel(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={"role":"student"})  
    interview_link = models.URLField()
    scheduled_time = models.DateTimeField()
    is_completed = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Interview call for {self.student.email}"
    