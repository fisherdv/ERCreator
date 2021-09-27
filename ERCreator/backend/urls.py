from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

from .views import ERModelsViewSet, TypeListView, EntityViewSet


router = DefaultRouter()
router.register("er_models", ERModelsViewSet, basename="ERModels")
router.register("entity", EntityViewSet, basename="entity")


urlpatterns = [    
    path('types/', TypeListView.as_view(), name='types'),
    path("", include(router.urls)),
    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
