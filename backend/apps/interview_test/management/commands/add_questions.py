from django.core.management.base import BaseCommand
from django.utils.text import slugify


#importing database model
from apps.interview_test.models.test_aptitude_models import Category, Question

class Command(BaseCommand):
    help = 'Seeds the database with a set of initial aptitude and coding questions.'
    def handle(self, *args, **kwargs):
        confirm = input("This will delete all existing questions and categories. Are you sure? (y/N): ")
        if confirm.lower() != 'y':
            self.stdout.write(self.style.WARNING('Seeding cancelled.'))
            return
        self.stdout.write('Deleting existing questions and categories...')
        Question.objects.all().delete()
        Category.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Done.'))

        questions_to_add = [
            {
                'category_name': 'Quantitative Aptitude',
                'difficulty': 'easy',
                'text': 'What is the value of pi to two decimal places?',
                'options': [
                    {'char': 'A', 'text': '3.12'},
                    {'char': 'B', 'text': '3.14'},
                    {'char': 'C', 'text': '3.16'},
                    {'char': 'D', 'text': '3.18'},
                ],
                'correct_option': 'B',
                'time_limit_seconds': 90
            },
            {
                'category_name': 'Quantitative Aptitude',
                'difficulty': 'easy',
                'text': 'If a train travels 120 km in 2 hours, what is its speed in km/h?',
                'options': [
                    {'char': 'A', 'text': '50 km/h'},
                    {'char': 'B', 'text': '60 km/h'},
                    {'char': 'C', 'text': '70 km/h'},
                    {'char': 'D', 'text': '80 km/h'},
                ],
                'correct_option': 'B',
                'time_limit_seconds': 90
            },
            {
                'category_name': 'Logical Reasoning',
                'difficulty': 'medium',
                'text': 'Which number should come next in the series: 2, 4, 8, 16, ?',
                'options': [
                    {'char': 'A', 'text': '24'},
                    {'char': 'B', 'text': '32'},
                    {'char': 'C', 'text': '20'},
                    {'char': 'D', 'text': '48'},
                ],
                'correct_option': 'B',
                'time_limit_seconds': 90
            },
            {
                'category_name': 'Verbal Ability',
                'difficulty': 'medium',
                'text': 'Choose the word that is most nearly the opposite in meaning to "Abundant".',
                'options': [
                    {'char': 'A', 'text': 'Plentiful'},
                    {'char': 'B', 'text': 'Ample'},
                    {'char': 'C', 'text': 'Scarce'},
                    {'char': 'D', 'text': 'Rich'},
                ],
                'correct_option': 'C',
                'time_limit_seconds': 90
            },
            {
                'category_name': 'Coding Challenges',
                'difficulty': 'medium',
                'text': 'Write a Python function `add(a, b)` that returns the sum of two numbers.',
                'options': { 'starter_code': 'def add(a, b):\n  # Your code here\n  pass' },
                'correct_option': '', # Not applicable
                'time_limit_seconds': 600 # 10 minutes
            },
            {
                'category_name': 'Data Structures and Algorithms',
                'difficulty': 'hard',
                'text': 'What is the time complexity of a binary search algorithm?',
                'options': [
                    {'char': 'A', 'text': 'O(n)'},
                    {'char': 'B', 'text': 'O(log n)'},
                    {'char': 'C', 'text': 'O(n^2)'},
                    {'char': 'D', 'text': 'O(1)'},
                ],
                'correct_option': 'B',
                'time_limit_seconds': 120
            },
        ]
        self.stdout.write('Adding new categories and questions...')
        count = 0
        for q_data in questions_to_add:
            category_name = q_data.pop('category_name')
            category_slug = slugify(category_name)

            category, created = Category.objects.get_or_create(
                slug=category_slug,
                defaults={'name': category_name}
            )
            Question.objects.create(category=category, **q_data)
            count += 1
        self.stdout.write(self.style.SUCCESS(f'Successfully added {count} questions to the database.'))
        

