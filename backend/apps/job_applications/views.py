from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from apps.jobs.models.jobsModel import Job
from apps.job_applications.models.jobApplicationModel import JobApplications
from django.shortcuts import get_object_or_404
from apps.utils.resume_matcher.matcher import calculate_resume_skill_score
from apps.job_applications.Email.confirmationEmail import send_application_confirmation

    
class ApplyToJob(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, id):
        job = get_object_or_404(Job, id=id)
        student = request.user

        if student.role != 'student':
            return Response({"error": "Only students can apply."}, status=status.HTTP_403_FORBIDDEN)

        resume = request.FILES.get('resume_file')
        if not resume:
            return Response({"error": "Resume is required."}, status=status.HTTP_400_BAD_REQUEST)

        job_data = {
            "title": job.title,
            "category": job.category,
            "job_type": job.job_type,
            "time_commitment": job.time_commitment,
            "description": job.description,
            "responsibilities": job.responsibilities,
            "skills_required": job.skills_required,
            "who_can_apply": job.who_can_apply,
            "graduation_years": job.graduation_years,
            "degrees_or_streams": job.degrees_or_streams,
            "experience_level": job.experience_level,
            "company_name": job.company_name,
            "about_company": job.about_company
        }

        # Gemini-based smart scoring
        score_data = calculate_resume_skill_score(resume, job_data, use_groq=True)
        score = score_data.get("score", 0)

        print("Resume Match Score:", score)
        print("Reason:", score_data.get("reason", "N/A"))

        if score >= 80:
            JobApplications.objects.create(
                job=job,
                student=student,
                resume_file=resume,
                resume_score=score
            )

        send_application_confirmation(
            student_email=student.email,
            student_name=f"{student.first_name} {student.last_name}",
            job_title=job.title
        )

        return Response({
            "message": "Application submitted successfully",
            "score": score,
            "details": score_data
        }, status=status.HTTP_201_CREATED)