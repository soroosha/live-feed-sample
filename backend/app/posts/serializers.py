
''' Post Serializers '''

from rest_framework import serializers
from django.conf import settings

from . import models

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Post
        fields = '__all__'