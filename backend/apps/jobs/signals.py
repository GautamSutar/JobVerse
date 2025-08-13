from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.jobs.models.jobsModel import Job
from apps.notifications.utils import send_push_notification_for_users
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from decouple import config
@receiver(post_save, sender=Job)
def job_created_send_notifications(sender, instance, created, **kwargs):
    if not created:
        return

    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "job_notifications",
        {
            "type": "send_job_notification",
            "content": {
                "job_id": instance.id,
                "title": instance.title,
                "company": instance.company_name,
                "location": getattr(instance, "location", ""),
            },
        },
    )
    frontend_url = config('FRONTEND_URL', default ='http://localhost:5173')
    send_push_notification_for_users(
        title="New Job Posted",
        body=f"{instance.title} at {instance.company_name}",
         url=f"{frontend_url}/job-details/{instance.id}"   
    )
