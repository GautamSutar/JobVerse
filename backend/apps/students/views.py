from rest_framework import generics, permissions, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.students.models import (
    StudentProfile, Certificate, Transcript, Internship,
    Project, SkillPreference, Achievement
)
from apps.students.serializers import (
    StudentProfileSerializer, CertificateSerializer, TranscriptSerializer,
    InternshipSerializer, ProjectSerializer, SkillPreferenceSerializer,
    AchievementSerializer
)

class StudentProfileCreateUpdateView(generics.GenericAPIView):
    serializer_class = StudentProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return StudentProfile.objects.filter(user=self.request.user).first()

    def get(self, request, *args, **kwargs):
        profile = self.get_object()
        if not profile:
            return Response({"detail": "Student profile not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        profile = self.get_object()
        if profile:
            serializer = self.get_serializer(profile, data=request.data, partial=True)
        else:
            serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response({
        "message": "Profile saved successfully.",
        "data": serializer.data
    }, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        profile = self.get_object()
        if not profile:
            profile = StudentProfile.objects.create(user=request.user)
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
        "message": "Profile updated successfully.",
        "data": serializer.data
    }, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        profile = self.get_object()
        if not profile:
            profile = StudentProfile.objects.create(user=request.user)
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
        "message": "Profile field updated successfully.",
        "data": serializer.data
    }, status=status.HTTP_200_OK)


class DeleteAccountView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def delete(self, request):
        if self.request.user.role != "student":
            raise ValidationError({"detail": "Only User of this account can delete his/her profile."})
        user = request.user
        user.delete()
        return Response({"detail": "Account deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

class BaseUpdateView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "pk"

    def get_object(self):
        profile, _ = StudentProfile.objects.get_or_create(user=self.request.user)
        pk = self.kwargs.get(self.lookup_field)
        return self.model.objects.filter(student=profile, pk=pk).first()

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        if not instance:
            return Response({"detail": f"No {self.model.__name__} found to update."}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        if not instance:
            return Response({"detail": f"No {self.model.__name__} found to update."}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class CertificateCreateView(generics.CreateAPIView):
    serializer_class = CertificateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role != "student":
            raise ValidationError({"detail": "Only students can upload certificates."})
        profile, _ = StudentProfile.objects.get_or_create(user=self.request.user)
        serializer.save(student=profile)
class CertificateListView(generics.ListAPIView):
    serializer_class = CertificateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        profile, _ = StudentProfile.objects.get_or_create(user=self.request.user)
        return Certificate.objects.filter(student=profile)
class CertificateUpdateView(BaseUpdateView):
    serializer_class = CertificateSerializer
    model = Certificate

class TranscriptCreateView(generics.CreateAPIView):
    serializer_class = TranscriptSerializer
    permission_classes = [permissions.IsAuthenticated]
    def perform_create(self, serializer):
        if self.request.user.role != "student":
            raise ValidationError({"detail": "Only students can upload transcripts."})
        profile, _ = StudentProfile.objects.get_or_create(user=self.request.user)
        serializer.save(student=profile)
class TranscriptListView(generics.ListAPIView):
    serializer_class = TranscriptSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        profile, _ = StudentProfile.objects.get_or_create(user=self.request.user)
        return Transcript.objects.filter(student=profile)
class TranscriptUpdateView(BaseUpdateView):
    serializer_class = TranscriptSerializer
    model = Transcript


class InternshipCreateView(generics.CreateAPIView):
    serializer_class = InternshipSerializer
    permission_classes = [permissions.IsAuthenticated]
    def perform_create(self, serializer):
        if self.request.user.role != "student":
            raise ValidationError({"detail": "Only students can upload internships."})
        profile, _ = StudentProfile.objects.get_or_create(user=self.request.user)
        serializer.save(student=profile)
class InternshipListView(generics.ListAPIView):
    serializer_class = InternshipSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        profile, _ = StudentProfile.objects.get_or_create(user=self.request.user)
        return Internship.objects.filter(student=profile)
class InternshipUpdateView(BaseUpdateView):
    serializer_class = InternshipSerializer
    model = Internship

class ProjectCreateView(generics.CreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role != "student":
            raise ValidationError({"detail": "Only students can upload projects."})
        profile, _ = StudentProfile.objects.get_or_create(user=self.request.user)
        serializer.save(student=profile)
class ProjectListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        profile, _ = StudentProfile.objects.get_or_create(user=self.request.user)
        return Project.objects.filter(student=profile)
class ProjectUpdateView(BaseUpdateView):
    serializer_class = ProjectSerializer
    model = Project

class SkillPreferenceCreateView(generics.CreateAPIView):
    serializer_class = SkillPreferenceSerializer
    permission_classes = [permissions.IsAuthenticated]
    def perform_create(self, serializer):
        if self.request.user.role != "student":
            raise ValidationError({"detail": "Only students can mention their skill preferences."})
        profile, _ = StudentProfile.objects.get_or_create(user=self.request.user)
        serializer.save(student=profile)
class SkillPreferenceListView(generics.ListAPIView):
    serializer_class = SkillPreferenceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        profile, _ = StudentProfile.objects.get_or_create(user=self.request.user)
        return SkillPreference.objects.filter(student=profile)
class SkillPreferenceUpdateView(BaseUpdateView):
    serializer_class = SkillPreferenceSerializer
    model = SkillPreference


class AchievementCreateView(generics.CreateAPIView):
    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticated]
    def perform_create(self, serializer):
        if self.request.user.role != "student":
            raise ValidationError({"detail": "Only students can upload achievements."})
        profile, _ = StudentProfile.objects.get_or_create(user=self.request.user)
        serializer.save(student=profile)

class AchievementListView(generics.ListAPIView):
    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        profile, _ = StudentProfile.objects.get_or_create(user=self.request.user)
        return Achievement.objects.filter(student=profile)
        
class AchievementUpdateView(BaseUpdateView):
    serializer_class = AchievementSerializer
    model = Achievement



