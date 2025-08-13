from rest_framework import permissions, status, viewsets
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from apps.jobs.job_serializer import JobSerializer
from apps.jobs.models.jobsModel import Job
from apps.jobs.permissions import IsHROwnerOrReadOnly
from rest_framework.decorators import action
from apps.job_applications.models.jobApplicationModel import JobApplications
from apps.job_applications.serializers import JobApplicationViewSerializer
from apps.job_applications.serializers import ApplicantDetailViewSerializer
from apps.notifications.utils import send_push_notification_for_users
from channels.layers import get_channel_layer 
from asgiref.sync import async_to_sync
class CreateJobView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if request.user.role != 'hr':
            return Response({"error": "Only Hr can Create the jobs"}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            job = serializer.save(hr=request.user)

            # WebSocket broadcast
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                "job_notifications",
                {
                    "type": "send_job_notification",
                    "content": {
                        "message": "New Job Posted",
                        "job_id": job.id,
                        "title": job.title,
                        "category": job.category,
                        "company": job.company_name,
                        "location": job.location,
                        "created_at": str(job.created_at),
                    },
                }
            )

            
            send_push_notification_for_users(
                title="New Job Posted",
                body=f"A new job has been posted: {job.title}",
                url=f"http://localhost:5173/job-details/{job.id}" 
            )

            return Response(
                data={'message': 'Successfully Job Serializer Saved', 'data': serializer.data},
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListAllJobs(ListAPIView):
   queryset = Job.objects.all().order_by('-created_at')
   serializer_class = JobSerializer
   
class ListAllJobsCreatedByHR(ListAPIView):
   permission_classes = [permissions.IsAuthenticated]
   serializer_class = JobSerializer
   def get_queryset(self):
    user = self.request.user
    return Job.objects.filter(hr=user) if user.role == 'hr' else Job.objects.none()
   
class ListAllJobsForStudent(ListAPIView):
   permission_classes = [permissions.IsAuthenticated]
   serializer_class = JobSerializer
   def get_queryset(self):
    user = self.request.user
    if user.role == 'student':
        return Job.objects.all()
    else:
        return Job.objects.none()

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
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def delete(self, request, *args, **kwargs):
        job = self.get_object()
        if request.user.role != 'hr':
            return Response({"error": "Student can Delete job. You are not HR"}, status=status.HTTP_403_FORBIDDEN)
        if request.user != job.hr:
            return Response({"error": "You can only delete your own job."}, status=status.HTTP_403_FORBIDDEN)
        return self.perform_destroy(job)
    
    def perform_destroy(self, instance):
        job_title = instance.title,
        instance.delete()
        return Response({'message':f'Job {job_title} deleted successfully'},status=status.HTTP_200_OK)
    

class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated, IsHROwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'hr':
            return Job.objects.filter(hr=user)
        return Job.objects.all()

    @action(detail=True, methods=['get'], url_path='applicants')
    def list_applicants(self, request, pk=None):
        job = self.get_object()
        applicants = JobApplications.objects.filter(job=job).select_related(
            'student__student_profile',
             'job__hr__hr_profile'
            ).prefetch_related(
            'student__student_profile__projects',
            'student__student_profile__internships'
            # Add other prefetches if needed
            )
        serializer = ApplicantDetailViewSerializer(applicants, many=True,context={'request': request})
        return Response(serializer.data)
    


class AllApplicantsByHRView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if request.user.role != 'hr':
            return Response({"error": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)

        hr_jobs = Job.objects.filter(hr=request.user)
        applications = JobApplications.objects.filter(job__in=hr_jobs).select_related(
            'student__student_profile__user',
            'job__hr__hr_profile__user'
        )

        jobs_serializer = JobSerializer(hr_jobs, many=True)
        applicants_serializer = JobApplicationViewSerializer(applications, many=True, context={'request': request})

        applicants_by_job = {}
        for applicant_data in applicants_serializer.data:
            job_id = applicant_data['job']['id']
            if job_id not in applicants_by_job:
                applicants_by_job[job_id] = []
            applicants_by_job[job_id].append(applicant_data)

        response_data = []
        for job_data in jobs_serializer.data:
            job_id = job_data['id']
            job_data['applicants'] = applicants_by_job.get(job_id, [])
            response_data.append(job_data)
            
        return Response(response_data)