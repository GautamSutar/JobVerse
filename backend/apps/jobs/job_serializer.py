from rest_framework import serializers
from apps.jobs.models.jobsModel import Job

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            'id',
            'hr',
            'title',
            'description',
            'domain',
            'skills_required',
            'start_date',
            'end_date',
            'created_at',
        ]
        read_only_fields = ['hr', 'created_at']