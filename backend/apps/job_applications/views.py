from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from apps.jobs.models.jobsModel import Job
from apps.job_applications.models.jobApplicationModel import JobApplications
from django.shortcuts import get_object_or_404
from apps.utils.resume_matcher.matcher import calculate_resume_score
from apps.job_applications.Email.confirmationEmail import send_application_confirmation
class ApplyToJob(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, id):
        # job_id = request.data.get('job_id')
        job = get_object_or_404(Job, id=id)
        student = request.user
        email = request.user.email
        first_name = request.user.first_name  
        last_name = request.user.last_name
        if student.role != 'student':
            return Response({"error": "Only students can apply."}, status=status.HTTP_403_FORBIDDEN)
        resume = request.FILES.get('resume_file')
        if not resume:
            return Response({"error": "Resume is required."}, status=status.HTTP_400_BAD_REQUEST)
        score = calculate_resume_score(resume, job.description, job.skills_required)
        print(score)
        if score <= 80:
            JobApplications.objects.create(
                job=job,
                student=student,
                resume_file = resume,
                resume_score = score
            )
        send_application_confirmation(
            student_email=email,
            student_name=f"{first_name} {last_name}",
            job_title=job.title
        )
        return Response({"message": "Application submitted successfully"}, status=status.HTTP_201_CREATED)
       