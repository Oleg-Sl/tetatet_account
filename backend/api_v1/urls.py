from django.urls import include, path
from rest_framework import routers

from api_v1.views import (
    api_root,
    TaskViewSet,
    UserActivationView,
)


app_name = 'api_v1'

router = routers.DefaultRouter()
router.register('task', TaskViewSet, basename='task')

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('activate/<str:uid>/<str:token>/', UserActivationView.as_view()),

    path('', api_root),
]

urlpatterns += router.urls
