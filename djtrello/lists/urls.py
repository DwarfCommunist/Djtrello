from django.urls import path
from . import views

urlpatterns = [
    path('list/list', views.ListsManager.as_view(), name='list_list'),
    path('list/create', views.ListsManager.as_view(), name='list_create'),
    path('list/delete', views.ListsManager.as_view(), name='list_delete'),
    path('list/move', views.ListMoveManager.as_view(), name='list_move')
]
