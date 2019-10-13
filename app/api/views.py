from rest_framework import viewsets
from django.contrib.auth.models import User
from .. import models
from . import serializers


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer


# class ProfileViewset(viewsets.ModelViewSet):
#     queryset = models.Profile.objects.all()
#     serializer_class = serializers.ProfileSerializer


class ThingViewset(viewsets.ModelViewSet):
    queryset = models.Thing.objects.all()
    serializer_class = serializers.ThingSerializer


class LocalisationViewset(viewsets.ModelViewSet):
    queryset = models.Localisation.objects.all()
    serializer_class = serializers.LocalisationSerializer


