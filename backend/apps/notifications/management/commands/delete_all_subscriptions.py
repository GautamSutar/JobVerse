from django.core.management.base import BaseCommand
from apps.notifications.models import PushSubscription

class Command(BaseCommand):
    help = 'Deletes all push subscriptions from the database.'

    def handle(self, *args, **options):
        count = PushSubscription.objects.count()
        if count == 0:
            self.stdout.write(self.style.SUCCESS('No push subscriptions to delete.'))
            return

        PushSubscription.objects.all().delete()
        self.stdout.write(self.style.SUCCESS(f'Successfully deleted {count} push subscriptions.'))