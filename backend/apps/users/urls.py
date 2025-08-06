from django.urls import path
from .views import SignupView, LoginView, DeleteAccountView, LogoutView


urlpatterns = [
      path('login/', LoginView.as_view(), name='login'),
      path('signup/', SignupView.as_view(), name='signup'),
      path('delete-account/', DeleteAccountView.as_view(), name='delete'),
      path('logout/', LogoutView.as_view(), name='logout'),
]




























# urlpatterns = [
#     path('login/', FirebaseLoginView.as_view(), name='login'),
#     path('signup/', SignupView.as_view(), name='signup'),
#     path('logout/', LogoutView.as_view(), name='logout'),
# ]