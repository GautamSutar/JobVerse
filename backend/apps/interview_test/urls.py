from django.urls import path
from .views import StartAptitudeTestView

urlpatterns = [
    path('aptitude-test/', StartAptitudeTestView.as_view(), name='start-aptitude-test'),
]