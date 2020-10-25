from rest_framework import serializers
from . import models


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Card
        fields = ('id', 'name')
