from apps.users.models import CustomUser
from apps.jobs.models.jobsModel import Job
from django.db import models


class JobApplications(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    resume_file = models.FileField(upload_to= "JobApplicationsResume/")
    resume_score = models.FloatField()
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.email} applied to {self.job.title}"

