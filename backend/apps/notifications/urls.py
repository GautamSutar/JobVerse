from django.urls import path, re_path
from .views import SaveSubscriptionView

urlpatterns = [
    path('save-subscription/', SaveSubscriptionView.as_view(), name='save-subscription'),
]
