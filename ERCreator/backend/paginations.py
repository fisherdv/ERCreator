from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


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


class ERModelsPagination(CustomPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 10000
