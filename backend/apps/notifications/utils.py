# In backend/apps/notifications/utils.py

import json
from pywebpush import webpush, WebPushException
from django.conf import settings
from .models import PushSubscription
from django.contrib.auth import get_user_model

User = get_user_model()
VAPID_CLAIMS = {"sub": f"mailto:{settings.VAPID_ADMIN_EMAIL}"}

def send_push_notification_for_users(title, body, url, users=None):
    """
    Sends a single push notification to each user who has at least one subscription.
    It sends to the user's most recently added device to prevent duplicates.
    """
    print("--- 1. Attempting to send push notifications ---")

    # 1. Get the User model instances.
    #    If a specific list of users isn't provided, get all users who have subscriptions.
    if users is None:
        # Get a unique list of user IDs from the subscription table,
        # then fetch the user objects.
        user_ids = PushSubscription.objects.values_list('user_id', flat=True).distinct()
        users_to_notify = User.objects.filter(id__in=user_ids)
    else:
        users_to_notify = users

    print(f"--- 2. Found {users_to_notify.count()} unique users with subscriptions. ---")

    # 3. Loop through each unique USER.
    for user in users_to_notify:
        print(f"--- 3. Preparing notification for user: {user.email} ---")
        try:
            # 4. Get the LATEST subscription for this specific user.
            #    The '-created_at' sorts by most recent first.
            latest_subscription = PushSubscription.objects.filter(user=user).latest('created_at')
            
            print(f"---    -> Sending to most recent endpoint: {latest_subscription.endpoint[:50]}... ---")

            # 5. Send the push notification to only this one subscription.
            webpush(
                subscription_info={
                    "endpoint": latest_subscription.endpoint,
                    "keys": latest_subscription.keys
                },
                data=json.dumps({"title": title, "body": body, "url": url}),
                vapid_private_key=settings.VAPID_PRIVATE_KEY,
                vapid_claims=VAPID_CLAIMS
            )
            print(f"--- 4. Push successful for user {user.email}! ---")

        except PushSubscription.DoesNotExist:
            # This can happen in rare race conditions. It's safe to ignore.
            print(f"---    -> User {user.email} had a subscription but it was deleted before sending. ---")
        except WebPushException as ex:
            print(f"--- 5. PUSH FAILED for user {user.email}! Details: {ex} ---")
            # If a subscription is invalid (404, 410), we should delete it.
            try:
                if ex.response and ex.response.status_code in (404, 410):
                    # We can get the subscription object from the exception context if needed
                    # For now, we can find it again to delete it.
                    PushSubscription.objects.filter(endpoint=ex.subscription_info['endpoint']).delete()
                    print(f"---    -> Deleted invalid subscription. ---")
            except Exception as e:
                print(f"---    -> Error while deleting invalid subscription: {e} ---")
        except Exception as e:
            # Catch any other unexpected errors.
            print(f"--- An unexpected error occurred for user {user.email}: {e} ---")