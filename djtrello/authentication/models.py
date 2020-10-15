from django.contrib.auth.models import AbstractUser
from django.db import models


class Customer(AbstractUser):
    nickname = models.CharField(blank=True, max_length=120)
