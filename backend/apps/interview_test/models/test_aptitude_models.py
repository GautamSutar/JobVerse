from django.db import models
class  Question(models.Model):
    text = models.TextField()
    question_type = models.CharField(max_length=50, default='aptitude')
    correct_options = models.CharField(max_length=50)
    time_limit_seconds = models.IntegerField(default=30)

    def __str__(self):
        return self.text[:50]

