import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Django.settings')
django.setup()
import apps.interview_test.routing
import apps.jobs.routing
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            apps.interview_test.routing.websocket_urlpatterns + 
            apps.jobs.routing.websocket_urlpatterns 
        )
    ),
})
