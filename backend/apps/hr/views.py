from rest_framework import generics, permissions, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from apps.hr.models import HRProfile
from apps.hr.serializers import HrProfileSerializer

class HRProfileCreateUpdateView(generics.GenericAPIView):
    serializer_class = HrProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if HRProfile.objects.filter(user=request.user).exists():
            raise ValidationError("Student profile already exists. You can edit it instead.")

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        mobile_number = serializer.validated_data.get('mobile_number')
        if mobile_number and HRProfile.objects.filter(mobile_number=mobile_number).exists():
            raise ValidationError({"mobile_number": "This mobile number already exists."})

        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request, *args, **kwargs):
        try:
            profile = request.user.hr_profile
        except HRProfile.DoesNotExist:
            return Response({"detail": "Student profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        try:
            profile = request.user.hr_profile
        except HRProfile.DoesNotExist:
            return Response({"detail": "Student profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(profile, data=request.data)
        serializer.is_valid(raise_exception=True)

        mobile_number = serializer.validated_data.get('mobile_number')
        if mobile_number and HRProfile.objects.filter(mobile_number=mobile_number).exclude(id=profile.id).exists():
            raise ValidationError({"mobile_number": "This mobile number is already in use."})

        serializer.save()
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        try:
            profile = request.user.hr_profile
        except HRProfile.DoesNotExist:
            return Response({"detail": "Student profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        mobile_number = serializer.validated_data.get('mobile_number')
        if mobile_number and HRProfile.objects.filter(mobile_number=mobile_number).exclude(id=profile.id).exists():
            raise ValidationError({"mobile_number": "This mobile number is already in use."})

        serializer.save()
        return Response(serializer.data)
