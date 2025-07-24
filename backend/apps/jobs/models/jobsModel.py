from apps.users.models import CustomUser
from django.db import models
class Job(models.Model):
    hr = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'hr'})
    title = models.CharField(max_length=255)
    domain = models.CharField(max_length=100)
    skills_required = models.TextField()
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title