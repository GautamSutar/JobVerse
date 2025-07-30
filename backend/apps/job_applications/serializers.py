from rest_framework import serializers
from apps.job_applications.models.jobApplicationModel import JobApplications
from apps.users.serializers import CustomUserInfoSerializer
class JobApplicationViewSerializer(serializers.ModelSerializer):
    student = CustomUserInfoSerializer
    class Meta:
        model = JobApplications
        fields = ['id', 'student', 'resume_file', 'resume_score', 'applied_at']

