from django.db import models
from ordered_model.models import OrderedModel


class List(OrderedModel):
    board = models.ForeignKey('boards.Board', on_delete=models.CASCADE, related_name='lists')
    name = models.CharField(max_length=100)
    order_with_respect_to = 'board'

    def __str__(self):
        return str(self.name)
