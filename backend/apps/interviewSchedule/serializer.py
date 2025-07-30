from rest_framework import serializers
from apps.interviewSchedule.models.interviewScheduleModel import ScheduleInterviewsModel
class ScheduleInterviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleInterviewsModel
        fields = ['job_applications', 'scheduled_time']


class ScheduleInterviewViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleInterviewsModel
        fields = '__all__' 