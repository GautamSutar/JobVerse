import json
from channels.generic.websocket import AsyncWebsocketConsumer

class JobNotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "job_notifications"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    
    async def send_job_notification(self, event):
       
        await self.send(text_data=json.dumps({
            "type": "send_job_notification",
            "content": event.get("content", {})
        }))
