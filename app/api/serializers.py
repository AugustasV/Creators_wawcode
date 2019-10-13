from rest_framework import serializers
from django.contrib.auth.models import User

from ..models import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email']


# class ProfileSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Profile
#         fields = ['id', 'phone']


class ThingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Thing
        fields = ['id', 'name', 'is_lost', 'note', 'date']


class LocalisationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Localisation
        fields = ['id', 'longitude', 'latitude', 'radius']
