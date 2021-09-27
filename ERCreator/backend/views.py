from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListCreateAPIView
from rest_framework.decorators import action
from rest_framework.response import Response

from .paginations import ERModelsPagination
from .serializers import ERModelDetailSerializer, ERModelSerializer, TypeSerializer, EntitySerializer, EntityPositionSerializer
from .models import Type, Entity


class TypeListView(ListCreateAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer


class ERModelsViewSet(ModelViewSet):
    serializer_class = ERModelSerializer
    detail_serializer_class = ERModelDetailSerializer
    filter_backends = [DjangoFilterBackend]
    pagination_class = ERModelsPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.request.user.er_models.all()

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return self.detail_serializer_class
        return super().get_serializer_class()


class EntityViewSet(ModelViewSet):
    queryset = Entity.objects.all()
    serializer_class = EntitySerializer

    def get_serializer_class(self):
        if self.action == 'change_position':
            return EntityPositionSerializer
        return super().get_serializer_class()

    @action(detail=True, methods=['post'], name='change position')
    def change_position(self, request, pk):                
        serializer = self.get_serializer(request.data)
        if serializer.is_valid:
            # print(serializer.data)
            Entity.objects.filter(pk=pk).update(**serializer.data)
        return Response(serializer.data)
