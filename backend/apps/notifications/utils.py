import json
from pywebpush import webpush, WebPushException
from django.conf import settings
from .models import PushSubscription

VAPID_CLAIMS = {"sub": f"mailto:{settings.VAPID_ADMIN_EMAIL}"}

def send_push_notification_for_users(title, body, url, users=None):
    qs = PushSubscription.objects.all()
    if users is not None:
        qs = qs.filter(user__in=users)

    for sub in qs:
        try:
            webpush(
                subscription_info={
                    "endpoint": sub.endpoint,
                    "keys": sub.keys
                },
                data=json.dumps({"title": title, "body": body, "url": url}),
                vapid_private_key=settings.VAPID_PRIVATE_KEY,
                vapid_claims=VAPID_CLAIMS
            )
        except WebPushException as ex:
            
            print("Push failed", ex)
            #
            try:
                if ex.response and ex.response.status_code in (404, 410):
                    sub.delete()
            except Exception:
                pass
