import time
import json
import channels
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import async_to_sync
from django.db.models.signals import post_save
from django.dispatch import receiver


from . import models
from . import serializers

GROUP_NAME = 'post_feed_group'

class PostFeedConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add(
            GROUP_NAME,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            GROUP_NAME,
            self.channel_name
        )
        await self.close()

    # async def receive(self, text_data):
    #     text_data_json = json.loads(text_data)
    #     message = text_data_json['message']

    #     saved_message = await database_sync_to_async(self.save_user_message)(
    #             message=message
    #         )

    #     await self.channel_layer.group_send(
    #         GROUP_NAME,
    #         {
    #             'type': 'chat_message',
    #             'message': message
    #         }
    #     )
    # def save_new_post(self):
    #     newpost = models.Post(title="AA", brief="AASD", type="BIOLOGY")
    #     newpost.save()
    
    # Receive message from room group
    async def events_new_post(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'post': event['post']
        }))

    @staticmethod
    @receiver(post_save, sender=models.Post)
    def push_to_post_feed(sender, instance, **kwargs):
        channel_layer = channels.layers.get_channel_layer()

        post_serializers = serializers.PostSerializer(instance)

        async_to_sync(channel_layer.group_send)(
            GROUP_NAME,
            {
                'type': 'events_new_post',
                'post': post_serializers.data
            }
        )