from rest_framework import serializers
from cards.serializers import CardSerializer
from . import models


class ListSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True,
                           read_only=True)

    class Meta:
        model = models.List
        fields = ('id', 'name', 'cards')
