from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListCreateAPIView

from .paginations import ERModelsPagination
from .serializers import ERModelDetailSerializer, ERModelSerializer, TypeSerializer
from .models import Type


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

