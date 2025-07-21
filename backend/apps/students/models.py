from django.db import models
from apps.users.models import CustomUser

class StudentProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='student_profile')

        
    mobile_number = models.CharField(max_length=15, unique=False, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)
    linkedin_profile = models.URLField(blank=True)
    github_profile = models.URLField(blank=True)
    languages_known = models.CharField(max_length=255, blank=True)

    
    college_name = models.CharField(max_length=255, blank=True, null=True)
    degree = models.CharField(max_length=100, blank=True, null=True)
    branch = models.CharField(max_length=100, blank=True, null=True)
    specialization = models.CharField(max_length=100, blank=True, null=True)
    graduation_year = models.IntegerField(blank=True, null=True)
    cgpa = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)
    school_name = models.CharField(max_length=255, blank=True, null=True)
    marks_12 = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    marks_10 = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

   
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    cover_letter = models.FileField(upload_to='cover_letters/', blank=True, null=True)
    ats_score = models.IntegerField(blank=True, null=True)
    aptitude_score = models.IntegerField(blank=True, null=True)
    ai_score = models.IntegerField(blank=True, null=True)
    interview_Feedback = models.TextField(blank=True, null=True)
    interview_taken = models.IntegerField(default=0)

    def __str__(self):
        return self.user.email


class Certificate(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='certificates')
    certificate_file = models.FileField(upload_to='certificates/', blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    credential_url = models.URLField(blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)


class Transcript(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='transcripts')
    transcript_file = models.FileField(upload_to='transcripts/', blank=True, null=True)


class Internship(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='internships')
    job_title = models.CharField(max_length=255, blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    stipend = models.CharField(max_length=50, blank=True, null=True)
    experience = models.TextField(blank=True, null=True)


class Project(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='projects')
    project_title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    technologies_used = models.CharField(max_length=255, blank=True, null=True)
    role = models.CharField(max_length=100, blank=True, null=True)
    github_link = models.URLField(blank=True, null=True)
    live_link = models.URLField(blank=True, null=True)


class SkillPreference(models.Model):
    student = models.OneToOneField(StudentProfile, on_delete=models.CASCADE, related_name='preferences')
    technical_skills = models.CharField(max_length=255, blank=True)
    soft_skills = models.CharField(max_length=255, blank=True)
    preferred_roles = models.CharField(max_length=255, blank=True)
    job_type = models.CharField(max_length=100, blank=True)  
    preferred_location = models.CharField(max_length=100, blank=True)


class Achievement(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='achievements')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    type = models.CharField(max_length=100)
