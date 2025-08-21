# apps/interview_test/consumers.py

import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.core.cache import cache
from asgiref.sync import sync_to_async

# Corrected task import name
from .tasks import grade_answer, log_unanswered_question, finalize_test_results
from .models.test_aptitude_models import Question

class AptitudeTestConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_loop_task = None
        self.total_timer_task = None
        self.answer_received_future = None

    async def connect(self):
        self.session_id = self.scope['url_route']['kwargs']['session_id']
        self.room_group_name = f'test_group_{self.session_id}' # Use a distinct group name
        session_key = f'test_session:{self.session_id}'

        if not cache.get(session_key):
            await self.close()
            return

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

        self.total_timer_task = asyncio.create_task(self.run_total_timer())
        self.test_loop_task = asyncio.create_task(self.run_test_loop())

    # CORRECTED INDENTATION: This is now a method of the class.
    async def disconnect(self, close_code):
        if self.test_loop_task and not self.test_loop_task.done():
            self.test_loop_task.cancel()
        if self.total_timer_task and not self.total_timer_task.done():
            self.total_timer_task.cancel()
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def run_total_timer(self):
        try:
            total_duration = 3600  # 60 Minutes
            await asyncio.sleep(total_duration)
            await self.end_test(reason='total_time_up')
        except asyncio.CancelledError:
            # This is expected when the test ends normally.
            pass

    async def run_test_loop(self):
        try:
            session_key = f'test_session:{self.session_id}'
            session_data = cache.get(session_key)
            
            # Defensive check in case session data disappears mid-test
            if not session_data or 'question_ids' not in session_data:
                await self.end_test(reason='session_data_error')
                return

            question_ids = session_data['question_ids']
            for question_id in question_ids:
                @sync_to_async
                def get_question_with_category(qid):
                    try:
                        # Use select_related for performance optimization
                        return Question.objects.select_related('category').get(id=qid)
                    except Question.DoesNotExist:
                        return None

                question = await get_question_with_category(question_id)
                if not question:
                    # Skip if a question was deleted mid-test
                    continue

                await self.send(text_data=json.dumps({
                    'type': 'new_question',
                    'question': {
                        'id': question.id, # Send the actual question ID
                        'text': question.text,
                        'options': question.options,
                        'category': question.category.name if question.category else 'General',
                        'difficulty': question.difficulty,
                    },
                    'duration': question.time_limit_seconds
                }))

                self.answer_received_future = asyncio.get_running_loop().create_future()
                try:
                    # Corrected syntax for wait_for
                    await asyncio.wait_for(self.answer_received_future, timeout=question.time_limit_seconds)
                except asyncio.TimeoutError:
                    await self.send(text_data=json.dumps({'type': 'time_up_for_question'}))
                    log_unanswered_question.delay(self.session_id, question.id)

            # If the loop finishes naturally, the user answered all questions
            await self.end_test(reason='all_questions_answered')
        except asyncio.CancelledError:
            # This is expected when the total timer ends the test
            pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data.get('type') == 'submit_answer':
            grade_answer.delay(self.session_id, data['question_id'], data['answer'])
            if self.answer_received_future and not self.answer_received_future.done():
                self.answer_received_future.set_result(True)

    async def end_test(self, reason='unknown'):
        await self.send(text_data=json.dumps({
            'type': 'test_finished',
            'reason': reason,
        }))
        # Corrected task name from 'finalize_test_result' to 'finalize_test_results'
        finalize_test_results.delay(self.session_id)
        
        # Clean up tasks before closing
        if self.test_loop_task and not self.test_loop_task.done():
            self.test_loop_task.cancel()
        if self.total_timer_task and not self.total_timer_task.done():
            self.total_timer_task.cancel()
        
        await self.close()