from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Delete all users and cascade related data'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        User.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('✅ All users and related data deleted.'))
