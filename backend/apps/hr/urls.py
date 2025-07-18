from django.urls import path, include
from .views import HRProfileCreateUpdateView

urlpatterns = [
    path('hr-profiles/', HRProfileCreateUpdateView.as_view(), name='hr_profile_create_update'),
]