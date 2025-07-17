from rest_framework import serializers
from apps.students.models import StudentProfile

class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = '__all__'
        read_only_fields = ['user']
        extra_kwargs = {
            'mobile_number': {'required': False},
        }