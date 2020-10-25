from django.db import models
from ordered_model.models import OrderedModel


class Card(OrderedModel):
    list = models.ForeignKey('lists.List', on_delete=models.CASCADE, related_name='cards')
    name = models.CharField(max_length=100)
    order_with_respect_to = 'list'

    def __str__(self):
        return str(self.name)
