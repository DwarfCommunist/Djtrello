from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.response import Response
from django.shortcuts import get_list_or_404, get_object_or_404
from .serializers import CardSerializer
from lists.models import List

from . import models


class CardsManager(APIView):

    def __get_card_list_json(self, list_id, cards):
        serializer = CardSerializer(cards, many=True)
        result_json = {'list_id': list_id,
                       'cards': serializer.data}
        return result_json

    def get(self, request, format='json'):
        current_user = request.user
        list_id = request.data['list_id']
        cards = get_list_or_404(models.Card,
                                list__id=list_id,
                                list__board__user=current_user)
        result_json = self.__get_card_list_json(list_id, cards)
        return Response(result_json, status=status.HTTP_200_OK)

    def post(self, request, format='json'):
        current_user = request.user
        list_id = request.data['list_id']
        list = get_object_or_404(List,
                                 board__user=current_user,
                                 id=list_id)
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid():
            list = serializer.save(list=list)
            if list:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format='json'):
        current_user = request.user
        card_id = request.data['card_id']
        card = get_object_or_404(models.Card,
                                 id=card_id,
                                 list__board__user=current_user)
        card.delete()
        return Response(status=status.HTTP_200_OK)


class CardMoveManager(APIView):

    def post(self, request, format='json'):
        current_user = request.user
        board_id = request.data['board_id']
        list_id = request.data['new_list_id']
        card_id = request.data['card_id']
        new_position = request.data['position']

        card = get_object_or_404(models.Card,
                                 id=card_id,
                                 list__board__id=board_id,
                                 list__board__user=current_user)
        list = get_object_or_404(List,
                                 id=list_id,
                                 board__id=board_id,
                                 board__user=current_user)
        card.list = list
        card.save()
        card.to(new_position)

        return Response(status=status.HTTP_200_OK)
