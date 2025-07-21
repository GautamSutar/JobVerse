from django.urls import path, include
from .views import HRProfileCreateUpdateView, DeleteHRAccountView

urlpatterns = [
    path('hr-profiles/', HRProfileCreateUpdateView.as_view(), name='hr_profile_create_update'),
     path('hr/delete-account/', DeleteHRAccountView.as_view(), name='delete-hr-account'),
]