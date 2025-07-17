from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentProfileCreateUpdateView

urlpatterns = [
    path('student-profiles/', StudentProfileCreateUpdateView.as_view(), name='student_profile_create_update'),
]