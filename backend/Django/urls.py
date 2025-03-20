from django.contrib import admin
from django.urls import path, include
from apps.interviews_ai.views import generate_question_api # import your functions 
from django.views.generic import RedirectView
from django.http import HttpResponse
# from apps.users.views import HomeView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.users.urls')),
    path('', RedirectView.as_view(url='/api/auth/login/', permanent=False)),  # Redirect root to login
    # path('', HomeView.as_view(), name='home'),  # Map root to home view
    path('api/generate_question_api/', generate_question_api, name='generate_question'),
    path('api/resume/', include('apps.resume_parsing.urls')) 
]