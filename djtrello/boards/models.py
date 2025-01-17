from django.db import models
from django.contrib.auth.models import User

from django.conf import settings


class Board(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return str(self.name)
