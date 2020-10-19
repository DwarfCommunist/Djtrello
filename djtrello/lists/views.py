from rest_framework.views import APIView
from rest_framework import status, permissions
from .serializers import ListSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from boards.models import Board
from . import models


class ListsManager(APIView):

    def __get_board_lists_json(self, board_id, lists):
        serializer = ListSerializer(lists, many=True)
        result_json = {'board_id': board_id,
                       'lists': serializer.data}
        return result_json

    def get(self, request, format='json'):
        current_user = request.user
        print(request.data)
        board_id = request.data['board_id']
        lists = models.List.objects.filter(board__id=board_id,
                                           board__user=current_user)
        result_json = self.__get_board_lists_json(board_id, lists)
        return Response(result_json, status=status.HTTP_200_OK)

    def post(self, request, format='json'):
        current_user = request.user
        board_id = request.data['board_id']
        board = get_object_or_404(Board,
                                  user=current_user,
                                  id=board_id)
        serializer = ListSerializer(data=request.data)
        if serializer.is_valid():
            list = serializer.save(board=board)
            if list:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format='json'):
        current_user = request.user
        board_id = request.data['board_id']
        list_id = request.data['list_id']
        list = get_object_or_404(models.List,
                                 id=list_id,
                                 board__id=board_id,
                                 board__user=current_user)
        list.delete()
        return Response(status=status.HTTP_200_OK)


class ListMoveManager(APIView):

    def post(self, request, format='json'):
        current_user = request.user
        board_id = request.data['board_id']
        list_id = request.data['list_id']
        new_position = request.data['position']

        list = get_object_or_404(models.List,
                                 id=list_id,
                                 board__id=board_id,
                                 board__user=current_user)
        list.to(new_position)
        return Response(status=status.HTTP_200_OK)
