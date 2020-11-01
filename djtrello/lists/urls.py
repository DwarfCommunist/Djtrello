from django.urls import path
from . import views

urlpatterns = [
    path('list/list/<int:id>', views.ListsManager.as_view(), name='list_list'),
    path('list/create', views.ListsManager.as_view(), name='list_create'),
    path('list/delete/board_id/<int:board_id>/list_id/<int:list_id>', views.ListsManager.as_view(), name='list_delete'),
    path('list/move', views.ListMoveManager.as_view(), name='list_move')
]
