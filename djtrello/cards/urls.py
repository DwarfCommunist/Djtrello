from django.urls import path
from . import views

urlpatterns = [
    path('card/list/<int:list_id>', views.CardsManager.as_view(), name='card_list'),
    path('card/create', views.CardsManager.as_view(), name='card_create'),
    path('card/delete', views.CardsManager.as_view(), name='card_delete'),
    path('card/move', views.CardMoveManager.as_view(), name='card_move')
]
