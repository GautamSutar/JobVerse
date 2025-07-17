from django.urls import path
from .views import SignupView, LoginView


urlpatterns = [
      path('login/', LoginView.as_view(), name='login'),
      path('signup/', SignupView.as_view(), name='signup'),
]




























# urlpatterns = [
#     path('login/', FirebaseLoginView.as_view(), name='login'),
#     path('signup/', SignupView.as_view(), name='signup'),
#     path('logout/', LogoutView.as_view(), name='logout'),
# ]