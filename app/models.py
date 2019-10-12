from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

class Thing(models.Model):
    is_lost = models.BooleanField(default=True)
    note = models.TextField()
    date = models.DateTimeField()

    def __str__(self):
        return self.category


class Category(models.Model):
    name = models.CharField(max_length=100)
    Things = models.OneToOneField(Thing,
                                  on_delete=models.CASCADE,
                                  primary_key=True)

    def __str__(self):
        return self.name


class Localisation(models.Model):
    longitude = models.CharField(max_length=50)
    latitude = models.CharField(max_length=50)
    radius = models.PositiveIntegerField()
    things = models.ForeignKey(Thing,
                               on_delete=models.CASCADE)

    def __str__(self):
        return f'Lng: {self.longitude}, Lat:{self.latitude}, radius:{self.radius}'
