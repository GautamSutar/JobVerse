from django.urls import path 
from .views import ApplyToJob

urlpatterns = [
    path('apply-job/<int:id>/', ApplyToJob.as_view(), name='apply-job'),
]