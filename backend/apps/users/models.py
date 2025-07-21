from django.contrib.auth.models import AbstractUser
from django.db import models
ROLE_CHOICES = (
    ('student', 'Student'),
    ('hr', 'HR'),
)
GENDER_CHOICES = (
    ('Male', 'Male'),
    ('Female', 'Female'),
    ('Other', 'Other'),
    ('Not prefer to say', 'Prefer not to say'),
)
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)
    gender = models.CharField(max_length=50, choices=GENDER_CHOICES, blank=True, null=True) 
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  

    def __str__(self):
        return self.email







    















# class CustomUser(AbstractUser):
#     name = models.CharField(max_length=100, blank=True)
#     firebase_uid = models.CharField(max_length=255, unique=True, null=True, blank=True)

#     def __str__(self):
#         return self.username  
    
# users/models.py