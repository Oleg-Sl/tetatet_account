from rest_framework.decorators import api_view, action
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework import status, viewsets
from rest_framework import filters
from rest_framework import permissions
from django_filters.rest_framework import DjangoFilterBackend


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'register': reverse('api_v1:user-list', request=request, format=format),
        'password reset': reverse('api_v1:user-reset-password', request=request, format=format),
        'password set': reverse('api_v1:user-set-password', request=request, format=format),
        'reset password confirm': reverse('api_v1:user-reset-password-confirm', request=request, format=format),

        'token create': reverse('api_v1:jwt-create', request=request, format=format),
        'token refresh': reverse('api_v1:jwt-refresh', request=request, format=format),
        'token verify': reverse('api_v1:jwt-verify', request=request, format=format),

        
    })


