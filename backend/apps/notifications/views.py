from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import PushSubscription

class SaveSubscriptionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        # subscription will include endpoint and keys (p256dh, auth)
        endpoint = data.get("endpoint")
        keys = data.get("keys", {})
        if not endpoint:
            return Response({"error": "Invalid subscription"}, status=400)

        sub, created = PushSubscription.objects.update_or_create(
            endpoint=endpoint,
            defaults={"user": request.user, "keys": keys}
        )
        return Response({"message": "Subscription saved"})
