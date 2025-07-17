from django.db import models
from apps.users.models import CustomUser

class HRProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='hr_profile')
    mobile_number = models.CharField(max_length=15, blank=True)
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')])
    company_name = models.CharField(max_length=255)
    company_email = models.EmailField()
    designation = models.CharField(max_length=100)
    linkedin_profile = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    
    def __str__(self):
        return f"{self.user.email} - {self.company_name}"
