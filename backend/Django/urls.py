from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.http import HttpResponse
from rest_framework_simplejwt import views as jwt_views

# from apps.users.views import HomeView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.users.urls')),
    path('', RedirectView.as_view(url='/api/auth/login/', permanent=False)),  # Redirect root to login
    # path('', HomeView.as_view(), name='home'),  # Map root to home view
    path('api/resume/', include('apps.resume_parsing.urls')),
    path('api/student/', include('apps.students.urls')),
    path('api/hr/', include('apps.hr.urls')),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/job/', include('apps.jobs.urls')),
    path('api/job-applications/', include('apps.job_applications.urls')),
    path('api/', include('apps.audioapp.urls')),
]