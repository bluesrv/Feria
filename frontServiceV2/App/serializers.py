from rest_framework import serializers
from .models import Alerts
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User


class AlertSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Alerts
        fields = ('id', 'date', 'level')



class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    username = serializers.CharField(
            max_length=32,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    first_name = serializers.CharField(
        max_length=100,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    last_name = serializers.CharField(
        max_length=100,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=6, max_length=100,
            write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password','first_name', 'last_name')
