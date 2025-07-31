from rest_framework import serializers
from apps.students.models import (
    StudentProfile, Certificate, Transcript, Internship,
    Project, SkillPreference, Achievement
)
from apps.users.models import CustomUser
from apps.users.serializers import CustomUserInfoSerializer
class StudentProfileSerializer(serializers.ModelSerializer):
    user = CustomUserInfoSerializer(read_only=False)
    class Meta:
        model = StudentProfile
        fields = '__all__'
        read_only_fields = ['user']
        extra_kwargs = {
            'mobile_number': {'required': False, 'allow_null': True, 'allow_blank': True},
            'date_of_birth': {'required': False, 'allow_null': True},
            'gender': {'required': False, 'allow_blank': True},
            'address': {'required': False, 'allow_blank': True},
            'linkedin_profile': {'required': False, 'allow_blank': True},
            'github_profile': {'required': False, 'allow_blank': True},
            'languages_known': {'required': False, 'allow_blank': True},

            'college_name': {'required': False, 'allow_null': True, 'allow_blank': True},
            'degree': {'required': False, 'allow_null': True, 'allow_blank': True},
            'branch': {'required': False, 'allow_null': True, 'allow_blank': True},
            'specialization': {'required': False, 'allow_null': True, 'allow_blank': True},
            'graduation_year': {'required': False, 'allow_null': True},
            'cgpa': {'required': False, 'allow_null': True},
            'school_name': {'required': False, 'allow_null': True, 'allow_blank': True},
            'marks_12': {'required': False, 'allow_null': True},
            'marks_10': {'required': False, 'allow_null': True},

            'resume': {'required': False, 'allow_null': True},
            'cover_letter': {'required': False, 'allow_null': True},
            'ats_score': {'required': False, 'allow_null': True},
            'aptitude_score': {'required': False, 'allow_null': True},
            'ai_score': {'required': False, 'allow_null': True},
            'interview_Feedback': {'required': False, 'allow_null': True, 'allow_blank': True},
            'interview_taken': {'required': False},
        }
    
    def update(self, instance, validates_data):
        user_data = validates_data.pop('user', None)

        for attr, value in validates_data.items():
            setattr(instance, attr, value)
        instance.save()

        if user_data:
            user = instance.user
            for attr, value in user_data.items():
                if attr not in ['email', 'username']:
                    setattr(user, attr, value)
            user.save()

        return instance


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ['id', 'certificate_file', 'name', 'credential_url']
        extra_kwargs = {
            'certificate_file': {'required': False, 'allow_null': True},
            'name': {'required': False, 'allow_blank': True},
            'credential_url': {'required': False, 'allow_blank': True}
        }


class TranscriptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transcript
        fields = ['id', 'transcript_file']
        extra_kwargs = {
            'transcript_file': {'required': False, 'allow_null': True},
        }


class InternshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Internship
        fields = [
            'id', 'job_title', 'company_name', 'start_date', 'end_date',
            'description', 'stipend', 'experience'
        ]
        extra_kwargs = {
            'job_title': {'required': False, 'allow_blank': True},
            'company_name': {'required': False, 'allow_blank': True},
            'start_date': {'required': False, 'allow_null': True},
            'end_date': {'required': False, 'allow_null': True},
            'description': {'required': False, 'allow_blank': True},
            'stipend': {'required': False, 'allow_blank': True},
            'experience': {'required': False, 'allow_blank': True},
        }


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'project_title', 'description', 'technologies_used',
            'role', 'github_link', 'live_link'
        ]
        extra_kwargs = {
            'project_title': {'required': False, 'allow_blank': True},
            'description': {'required': False, 'allow_blank': True},
            'technologies_used': {'required': False, 'allow_blank': True},
            'role': {'required': False, 'allow_blank': True},
            'github_link': {'required': False, 'allow_blank': True},
            'live_link': {'required': False, 'allow_blank': True},
        }


class SkillPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillPreference
        fields = [
            'id', 'technical_skills', 'soft_skills', 'preferred_roles',
            'job_type', 'preferred_location'
        ]
        extra_kwargs = {
            'technical_skills': {'required': False, 'allow_blank': True},
            'soft_skills': {'required': False, 'allow_blank': True},
            'preferred_roles': {'required': False, 'allow_blank': True},
            'job_type': {'required': False, 'allow_blank': True},
            'preferred_location': {'required': False, 'allow_blank': True},
        }


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ['id', 'title', 'description', 'type']
        extra_kwargs = {
            'title': {'required': False, 'allow_blank': True},
            'description': {'required': False, 'allow_blank': True},
            'type': {'required': False, 'allow_blank': True},
        }


class StudentDetailSerializer(serializers.ModelSerializer):
    student_profile = StudentProfileSerializer(read_only=True)
    class Meta:
        model = CustomUser
        fields = ['student_profile']