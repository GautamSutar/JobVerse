from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
# from apps.users.views import HomeView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.users.urls')),
    path('', RedirectView.as_view(url='/api/auth/login/', permanent=False)),  # Redirect root to login
    # path('', HomeView.as_view(), name='home'),  # Map root to home view
]