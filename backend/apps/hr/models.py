from django.db import models
from apps.users.models import CustomUser

class HRProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='hr_profile')
    mobile_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')])
    company_name = models.CharField(max_length=255, null=True, blank=True)
    company_email = models.EmailField(unique=True)
    designation = models.CharField(max_length=100, null=True, blank=True)
    linkedin_profile = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    
    def __str__(self):
        return f"{self.user.email} - {self.company_name}"
