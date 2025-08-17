import uuid
from django.db import models
from django.conf import settings
class AptitudeTestResult(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    session_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)

    STATUS_CHOICES = [
        ('started', 'Started'),
        ('completed', 'Completed'),
        ('terminated', 'Terminated'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='started')
    results = models.JSONField(default=dict) 
    final_score = models.FloatField(null=True, blank=True)
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    def __str__(self):
        return f"Test for {self.student.email} on {self.started_at.strftime('%Y-%m-%d')}"  
