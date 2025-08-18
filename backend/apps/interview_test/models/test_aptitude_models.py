from django.db import models
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, help_text="A short, URL-friendly version of the name.")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"

class Question(models.Model):
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name="questions")

    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default='medium')

    text = models.TextField(help_text="The main text of the question or coding problem.")
    
    options = models.JSONField(
        default=dict,
        blank=True,
        help_text='For aptitude: [{"char": "A", "text": "Option A"}]. For coding: can be empty or have starter code.'
    )
    
    correct_option = models.CharField(
        max_length=10, 
        blank=True,
        help_text="For aptitude questions, the correct character (e.g., 'A', 'B'). Can be blank for coding questions."
    )
    time_limit_seconds = models.IntegerField(default=90, help_text="Time allowed for this specific question in seconds.")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.category.name if self.category else 'No Category'}: {self.text[:50]}..."