from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.cache import cache
from apps.interview_test.models.aptitude_test_result_model import AptitudeTestResult
from apps.interview_test.models.test_aptitude_models import Question
from django.utils import timezone
from rest_framework import status
class StartAptitudeTestView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        print(f"DEBUG: Using cache backend: {cache.__class__.__module__}.{cache.__class__.__name__}")
        student = request.user
        test_result = AptitudeTestResult.objects.create(student=student)
        question_ids = list(Question.objects.values_list('id', flat=True))  
        session_data = {
            'student_id': student.id,
            'question_ids': question_ids,
            'violations': 0,
            'start_time': timezone.now().isoformat(),
        }
        print("session_data",session_data)

        cache_key = f'test_session:{test_result.session_id}'
        cache.set(cache_key, session_data, timeout=3600)
        print(f"DEBUG: Set data for cache key: {cache_key}")
        return Response(
            {'session_id': test_result.session_id},
            status=status.HTTP_201_CREATED
        )  