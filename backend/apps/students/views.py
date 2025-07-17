from rest_framework import generics, permissions, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from apps.students.models import StudentProfile
from apps.students.serializers import StudentProfileSerializer

class StudentProfileCreateUpdateView(generics.GenericAPIView):
    serializer_class = StudentProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if StudentProfile.objects.filter(user=request.user).exists():
            raise ValidationError("Student profile already exists. You can edit it instead.")

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        mobile_number = serializer.validated_data.get('mobile_number')
        if mobile_number and StudentProfile.objects.filter(mobile_number=mobile_number).exists():
            raise ValidationError({"mobile_number": "This mobile number already exists."})

        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request, *args, **kwargs):
        try:
            profile = request.user.student_profile
        except StudentProfile.DoesNotExist:
            return Response({"detail": "Student profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        try:
            profile = request.user.student_profile
        except StudentProfile.DoesNotExist:
            return Response({"detail": "Student profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(profile, data=request.data)
        serializer.is_valid(raise_exception=True)

        mobile_number = serializer.validated_data.get('mobile_number')
        if mobile_number and StudentProfile.objects.filter(mobile_number=mobile_number).exclude(pk=profile.pk).exists():
            raise ValidationError({"mobile_number": "This mobile number is already in use."})

        serializer.save()
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        try:
            profile = request.user.student_profile
        except StudentProfile.DoesNotExist:
            return Response({"detail": "Student profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        mobile_number = serializer.validated_data.get('mobile_number')
        if mobile_number and StudentProfile.objects.filter(mobile_number=mobile_number).exclude(pk=profile.pk).exists():
            raise ValidationError({"mobile_number": "This mobile number is already in use."})

        serializer.save()
        return Response(serializer.data)
