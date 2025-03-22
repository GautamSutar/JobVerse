from django.db import models

class InterviewQuestion(models.Model):
    CATEGORY_CHOICES = [
        ("Technical", "Technical"),
        ("Behavioral", "Behavioral"),
        ("Scenario-Based", "Scenario-Based"),
        ("HR", "HR"),
        ("Project-Related", "Project-Related"),
        ("Leadership & Management", "Leadership & Management"),
        ("Problem-Solving & Critical Thinking", "Problem-Solving & Critical Thinking"),
        ("Industry-Specific", "Industry-Specific"),
        ("AI/ML & Data Science", "AI/ML & Data Science"),
        ("Company-Specific", "Company-Specific"),
    ]

    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    question = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.category}: {self.question[:50]}"
