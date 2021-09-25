from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import ERModel
from .serializers import ERModelSerializer


class CustomPagination(PageNumberPagination):
    def get_paginated_response(self, data):

        return Response({
            'pagination': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link(),
                'current_page': self.page.number,
                'num_pages': self.page.paginator.num_pages,
            },
            'results': data
        })


class LargeResultsSetPagination(CustomPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 10000


class ERModelsViewSet(ModelViewSet):
    queryset = ERModel.objects.all()
    serializer_class = ERModelSerializer
    filter_backends = [DjangoFilterBackend]
    pagination_class = LargeResultsSetPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
