from django.urls import include, path
from rest_framework import routers

from api_v1.views import (
    api_root,
)


app_name = 'api_v1'

router = routers.DefaultRouter()
# router.register('events', EventViewSet, basename='events')


urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('', api_root),
]

urlpatterns += router.urls
