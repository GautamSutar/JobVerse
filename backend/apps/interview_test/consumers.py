import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.core.cache import cache
from asgiref.sync import sync_to_async
from apps.interview_test.tasks import grade_answer, log_unanswered_question
from apps.interview_test.models.test_aptitude_models import Question
class AptitudeTestConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
      super().__init__(*args, **kwargs)
      self.test_loop_task =None
      self.answer_received_future = None
    async def connect(self):
      self.session_id = self.scope['url_route']['kwargs']['session_id']
      self.room_group_name = f'test_{self.session_id}'
      if not cache.get(f'test_session:{self.session_id}'):
         await self.close()
         return
      await self.channel_layer.group_add(self.room_group_name, self.channel_name)
      await self.accept()
      
      # starting the main test loop in the background
      self.test_loop_task = asyncio.create_task(self.run_test_loop())
    # to stop test when the user closes browser and cancel tab
    async def disconnect(self, close_code):
        if self.test_loop_task:
           self.test_loop_task.cancel()
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)  
         
    async def run_test_loop(self):
       session_key = f'test_session:{self.session_id}'
       session_data = cache.get(session_key)
       question_ids = session_data['question_ids']
       for question_id in question_ids:
          question = await sync_to_async(Question.objects.get)(id=question_id)
          await self.send(text_data=json.dumps({
              'type': 'new_question',
              'question':{
              'id': question_id,
              'text': question.text,
              'options': question.get_options(),  
              },
              'duration': question.time_limit_seconds
              }))
          self.answer_received_future = asyncio.get_running_loop().create_future()
          try:
             await asyncio.wait_for(self.answer_received_future, question.time_limit_seconds)
          except asyncio.TimeoutError:
             await self.send(text_data=json.dumps({'type': 'time_up_for_question'}))
             log_unanswered_question.delay(self.session_id, question.id) 
        
       await self.send(text_data=json.dumps({'type': 'test_finished'}))
       await self.close()
    
    async def receive(self, text_data):
       data = json.loads(text_data)
       if data.get('type') == 'submit_answer':
          grade_answer.delay(self.session_id, data['question_id'], data['answer'])
          if self.answer_received_future and not self.answer_received_future.done():
                self.answer_received_future.set_result(True)
          

    