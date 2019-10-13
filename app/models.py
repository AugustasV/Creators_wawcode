from django.db import models


class Thing(models.Model):
    name = models.CharField(max_length=20, default=None)
    is_lost = models.BooleanField(default=True)
    note = models.TextField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=50, default='other')
    lng = models.CharField(max_length=50, default=None)
    lat = models.CharField(max_length=50, default=None)
    login = models.CharField(max_length=50, default=None)
    email = models.CharField(max_length=50, default=None)
    phone = models.CharField(max_length=50, default=None)
    identity = models.CharField(max_length=50, default=None)


    def __str__(self):
        return self.name