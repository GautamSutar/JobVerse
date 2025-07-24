from django.urls import path 
from .views import ApplyToJob

urlpatterns = [
    path('apply-job/', ApplyToJob.as_view(), name='apply-job'),
]