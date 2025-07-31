from rest_framework import serializers
from apps.job_applications.models.jobApplicationModel import JobApplications
from apps.users.serializers import CustomUserInfoSerializer
from apps.jobs.job_serializer import JobDetailSerializer
from apps.students.serializers import StudentDetailSerializer
class JobApplicationViewSerializer(serializers.ModelSerializer):
    student = CustomUserInfoSerializer
    class Meta:
        model = JobApplications
        fields = ['id', 'student', 'resume_file', 'resume_score', 'applied_at']


class ApplicantDetailViewSerializer(serializers.ModelSerializer):
    resume = serializers.FileField(source='resume_file', read_only=True)
    student = StudentDetailSerializer(read_only=True)
    job = JobDetailSerializer(read_only=True)

    class Meta:
        model = JobApplications
        fields = [
            'id',
            'resume',
            'resume_score',
            'student',
            'job'
            ]