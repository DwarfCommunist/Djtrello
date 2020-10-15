from django.contrib import admin
from .models import Customer


@admin.register(Customer)
class CustomerUserAdmin(admin.ModelAdmin):
    model = Customer


