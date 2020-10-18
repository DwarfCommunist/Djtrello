from rest_framework.views import APIView
from .serializers import BoardSerializer
from rest_framework import status, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from . import models


class BoardsManager(APIView):

    def __get_user_boards_json(self, current_user):
        boards = models.Board.objects.filter(user=current_user)
        serializer = BoardSerializer(boards, many=True)
        result_json = {'boards': serializer.data}
        return result_json

    def get(self, request, format='json'):
        current_user = request.user
        result_json = self.__get_user_boards_json(current_user)
        return Response(result_json, status=status.HTTP_200_OK)

    def post(self, request, format='json'):
        current_user = request.user
        serializer = BoardSerializer(data=request.data)
        if serializer.is_valid():
            board = serializer.save(user=current_user)
            if board:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format='json'):
        board = get_object_or_404(models.Board,
                                  id=id)
        board.delete()
        return Response(status=status.HTTP_200_OK)
