from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from apps.jobs.job_serializer import JobSerializer
from apps.jobs.models.jobsModel import Job

class CreateJobView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        if request.user.role != 'hr':
            return Response({"error": "Only Hr can Create the jobs"}, status=status.HTTP_403_FORBIDDEN)
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(hr=request.user)
            return Response(
                data={'message': 'Successfully Job Serializer Saved', 'data': serializer.data},status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ListAllJobs(ListAPIView):
   queryset = Job.objects.all().order_by('-created_at')
   serializer_class = JobSerializer

class RetrieveJobByIdView(RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    lookup_field = 'id'

class UpdateJobView(UpdateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def put(self, request, *args, **kwargs):
        job = self.get_object()
        if request.user != job.hr:
            return Response({"error": "You can only update your own job."}, status=403)
        return super().put(request, *args, **kwargs)

class DeleteJobView(DestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

    def delete(self, request, *args, **kwargs):
        job = self.get_object()
        if request.user != job.hr:
            return Response({"error": "You can only delete your own job."}, status=status.HTTP_403_FORBIDDEN)
        return super().delete(request, *args, **kwargs)