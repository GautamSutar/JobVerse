from django.urls import path
from .views import FirebaseLoginView, SignupView, LogoutView

urlpatterns = [
    path('login/', FirebaseLoginView.as_view(), name='login'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('logout/', LogoutView.as_view(), name='logout'),
]