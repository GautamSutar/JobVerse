from rest_framework import serializers
from apps.hr.models import HRProfile

class HrProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = HRProfile
        fields = '__all__'
        read_only_fields = ['user']
        extra_kwargs = {
            'mobile_number': {'required': False},
        }