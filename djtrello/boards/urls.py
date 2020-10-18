from django.urls import path
from . import views

urlpatterns = [
    path('board/list', views.BoardsManager.as_view(), name='board_list'),
    path('board/create', views.BoardsManager.as_view(), name='board_create'),
    path('board/delete/<int:id>', views.BoardsManager.as_view(), name='board_delete')
]
