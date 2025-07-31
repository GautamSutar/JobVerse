from rest_framework import serializers
from apps.hr.models import HRProfile
from apps.users.models import CustomUser


class CustomUserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'username', 'email']
        read_only_fields = ['email', 'username']


class HRProfileSerializer(serializers.ModelSerializer):
    user = CustomUserInfoSerializer(required=False)

    class Meta:
        model = HRProfile
        fields = '__all__'
        read_only_fields = ['user']  # user relation can't be overwritten

        extra_kwargs = {
            'mobile_number': {'required': False, 'allow_null': True, 'allow_blank': True},
            'gender': {'required': False, 'allow_blank': True},
            'linkedin_profile': {'required': False, 'allow_blank': True},
            'company_name': {'required': False, 'allow_null': True, 'allow_blank': True},
            'company_email': {'required': False, 'allow_null': True, 'allow_blank': True},
            'company_location': {'required': False, 'allow_null': True, 'allow_blank': True},
            'designation': {'required': False, 'allow_null': True, 'allow_blank': True},
        }

    def create(self, validated_data):
        user = self.context['request'].user
        return HRProfile.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        # Pop the nested user data if present
        user_data = validated_data.pop('user', None)

        # Update HRProfile fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update nested user fields
        if user_data:
            user = instance.user
            for attr, value in user_data.items():
                if attr not in ['email', 'username']:
                    setattr(user, attr, value)
            user.save()

        return instance


class HRDetailSerializer(serializers.ModelSerializer):
    hr_profile = HRProfileSerializer(read_only=True)
    class Meta:
        model = CustomUser
        fields = ['hr_profile']