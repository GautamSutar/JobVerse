from rest_framework import generics, permissions, status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from .models import HRProfile
from .serializers import HRProfileSerializer
from apps.jobs.models.jobsModel import Job
from apps.jobs.job_serializer import JobSerializer


class HRProfileCreateUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            profile = HRProfile.objects.get(user=request.user)
            serializer = HRProfileSerializer(profile)
            return Response(serializer.data)
        except HRProfile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        serializer = HRProfileSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()  # create method will use request.user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        try:
            profile = HRProfile.objects.get(user=request.user)
        except HRProfile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = HRProfileSerializer(profile, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        try:
            profile = HRProfile.objects.get(user=request.user)
        except HRProfile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = HRProfileSerializer(profile, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



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