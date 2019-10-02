from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import viewsets
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User

from .serializers import AlertSerializer, UserSerializer
from .models import Alerts

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alerts.objects.all().order_by('date')
    serializer_class = AlertSerializer

@method_decorator(login_required, name='dispatch')
class index(TemplateView):
    template_name = "index.html"


class UserViewSet(viewsets.ModelViewSet):
    """
    Example empty viewset demonstrating the standard
    actions that will be handled by a router class.

    If you're using format suffixes, make sure to also include
    the `format=None` keyword argument for each action.
    """
    queryset =User.objects.all()
    serializer_class = UserSerializer
