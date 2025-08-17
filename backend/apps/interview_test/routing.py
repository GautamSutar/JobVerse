from django.urls import path
from apps.interview_test.consumers import AptitudeTestConsumer

websocket_urlpatterns = [
    path('ws/test/<str:session_id>/', AptitudeTestConsumer.as_asgi()),
]