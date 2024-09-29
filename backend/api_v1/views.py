import requests
from rest_framework.decorators import api_view, action
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework import status, viewsets
from rest_framework import filters
from rest_framework import permissions
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import redirect
from django.core.mail import send_mail

from accountapp.models import Task
from accountapp.serializers import TaskSerializer


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'register': reverse('api_v1:user-list', request=request, format=format),
        'activation': reverse('api_v1:user-activation', request=request, format=format),
        'resend_activation': reverse('api_v1:user-resend-activation', request=request, format=format),
        'password reset': reverse('api_v1:user-reset-password', request=request, format=format),
        'password set': reverse('api_v1:user-set-password', request=request, format=format),
        'reset password confirm': reverse('api_v1:user-reset-password-confirm', request=request, format=format),

        'token create': reverse('api_v1:jwt-create', request=request, format=format),
        'token refresh': reverse('api_v1:jwt-refresh', request=request, format=format),
        'token verify': reverse('api_v1:jwt-verify', request=request, format=format),

        'tasks': reverse('api_v1:task-list', request=request, format=format),
    })


class TaskViewSet(viewsets.ModelViewSet):
    # permission_classes = (permissions.IsAuthenticated,)
    # action_permissions = {
    #     permissions.IsAdminUser: ['update', 'partial_update', 'destroy',
    #                               'create'],
    #     permissions.AllowAny: ['list', 'retrieve', 'get_similar']
    # }

    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend,]
    search_fields = ['$title']
    ordering_fields = ('status', 'priority', 'deadline', 'created_by', 'date_created')
    filterset_fields = ['status', 'priority']
    http_method_names = ['get', 'post', 'put', 'patch', 'head', 'delete', 'options']



class UserActivationView(APIView):
    # https://protocolostomy.com/2021/05/06/user-activation-with-django-and-djoser/
    def get (self, request, uid, token):
        send_mail("subject", "message", "slepcov_oleg@mail.ru", ["slepcovolezhka@gmail.com"])
        
        protocol = 'https://' if request.is_secure() else 'http://'
        web_url = protocol + request.get_host()
        post_url = web_url + "/api/v1/auth/users/activation/"
        post_data = {'uid': uid, 'token': token}
        result = requests.post(post_url, data = post_data)
        if result.status_code == 204:
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_400_BAD_REQUEST)

