from rest_framework import serializers
from apps.jobs.models.jobsModel import Job

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            'id',
            'hr',
            'title',
            'category',
            'job_type',
            'time_commitment',
            'description',
            'responsibilities',
            'openings',
            'skills_required',
            'who_can_apply',
            'graduation_years',
            'degrees_or_streams',
            'women_reentry',
            'experience_level',
            'salary_or_stipend',
            'location',
            'start_date',
            'duration',
            'application_deadline',
            'perks',
            'ppo_available',
            'cover_letter_question',
            'assessment_questions',
            'require_resume',
            'company_name',
            'about_company',
            'company_website',
            'created_at',
        ]
        read_only_fields = ['hr', 'created_at']
