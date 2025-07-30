from django.db import models
from apps.users.models import CustomUser

class Job(models.Model):
    hr = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'hr'})
    title = models.CharField(max_length=255, default="Job Title")
    category = models.CharField(max_length=100, default="General")
    job_type = models.CharField(max_length=20, choices=[
        ('in_office', 'In-office'),
        ('remote', 'Remote'),
        ('hybrid', 'Hybrid'),
    ], default='remote')
    time_commitment = models.CharField(max_length=20, choices=[
        ('full_time', 'Full-time'),
        ('part_time', 'Part-time'),
    ], default='full_time')
    description = models.TextField(default="Job description not provided.")
    responsibilities = models.TextField(default="Responsibilities not provided.")
    openings = models.PositiveIntegerField(null=True, blank=True, default=1)

    skills_required = models.TextField(default="Not specified")
    who_can_apply = models.TextField(blank=True, null=True)
    graduation_years = models.CharField(max_length=100, blank=True, null=True)
    degrees_or_streams = models.TextField(blank=True, null=True)
    women_reentry = models.BooleanField(default=False)
    experience_level = models.CharField(max_length=50, default="0-1 years")

    salary_or_stipend = models.CharField(max_length=100, default="Unpaid")
    location = models.CharField(max_length=100, default="Work from Home")
    start_date = models.DateField()
    duration = models.CharField(max_length=50, default="3 months")
    application_deadline = models.DateField()

    perks = models.TextField(blank=True, null=True)
    ppo_available = models.BooleanField(null=True, blank=True, default=False)

    cover_letter_question = models.TextField(default="Why should you be hired for this role?")
    assessment_questions = models.TextField(blank=True, null=True)
    require_resume = models.BooleanField(default=True)

    company_name = models.CharField(max_length=255, default="Company Name")
    about_company = models.TextField(default="Information about the company is not provided.")
    company_website = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title