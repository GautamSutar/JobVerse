from django.db import models

class AudioFile(models.Model):
    file = models.FileField(upload_to='uploads/')
    transcribed_text = models.TextField(blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
