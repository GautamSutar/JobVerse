from rest_framework import generics, permissions, status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from .models import HRProfile
from rest_framework import generics, permissions, status
from .serializers import HRProfileSerializer
from apps.jobs.models.jobsModel import Job
from apps.jobs.job_serializer import JobSerializer


class HRProfileCreateUpdateView(generics.GenericAPIView):
    serializer_class = HRProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return HRProfile.objects.filter(user=self.request.user).first()

    def get(self, request, *args, **kwargs):
        profile = self.get_object()
        if not profile:
            return Response({"detail": "Hr profile not found."}, status=status.HTTP_404_NOT_FOUND)
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
            profile = HRProfile.objects.create(user=request.user)
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
            profile = HRProfile.objects.create(user=request.user)
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
        "message": "Profile field updated successfully.",
        "data": serializer.data
    }, status=status.HTTP_200_OK)



class DeleteHRAccountView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        if getattr(request.user, 'role', None) != "hr":
            raise ValidationError({"detail": "Only HR users can delete their account."})
        request.user.delete()
        return Response({"detail": "HR Account deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    
class MyJobListView(ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Job.objects.filter(hr=self.request.user).order_by('-created_at')