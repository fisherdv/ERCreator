from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet

from .models import ERModel
from .serializers import ERModelSerializer


class ERModelsViewSet(ModelViewSet):
    queryset = ERModel.objects.all()
    serializer_class = ERModelSerializer
    filter_backends = [DjangoFilterBackend]
