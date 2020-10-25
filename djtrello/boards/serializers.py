from rest_framework import serializers
from . import models


class BoardSerializer(serializers.ModelSerializer):
    lists = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )

    class Meta:
        model = models.Board
        fields = ('id', 'name', 'lists')


