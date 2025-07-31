from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from apps.interviewSchedule.serializer import ScheduleInterviewCreateSerializer, ScheduleInterviewViewSerializer
from apps.interviewSchedule.EMAIL.email_service import send_interview_schedule_email
class ScheduleInterviewAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, *args, **kwargs):
        hr_user = request.user
        if hr_user.role != 'hr':
            return Response({
                "error": "Only HR users can schedule interviews."
            },
            status=status.HTTP_403_FORBIDDEN
            )
        print("--- RAW DATA RECEIVED FROM FRONTEND ---")
        print(request.data)
        print("---------------------------------------")
        serializer = ScheduleInterviewCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        application = serializer.validated_data['job_applications']
        if application.job.hr != hr_user:
            raise PermissionDenied("You are no authorized to schedule an interview for this job application.")
        
        student = application.student
        hr_profile = hr_user.hr_profile
        company_name = hr_profile.company_name if hr_profile else 'Our Company'
        dummy_link = f"https://ai.jobverse.com/session/{application.id}/{student.id}"
        interview_instance = serializer.save(interview_link=dummy_link)

        send_interview_schedule_email(
            student_email=student.email,
            student_name=student.get_full_name() or student.username,
            hr_name=hr_user.get_full_name() or hr_user.username,
            company_name=company_name,
            job_title=application.job.title,
            interview_link=interview_instance.interview_link,
            scheduled_time=interview_instance.scheduled_time
        )
        response_serializer = ScheduleInterviewViewSerializer(interview_instance)
        return Response({
            "message": "Interview scheduled successfully and an invitation email has been sent.",
            "data": response_serializer.data
        }, status=status.HTTP_201_CREATED)