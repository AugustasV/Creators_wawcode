from django.db import models
from django.contrib.auth.models import User
# from django.db.models.signals import post_save
# from django.dispatch import receiver


# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     phone = models.CharField(max_length=15, blank=True)
#
#     @receiver(post_save, sender=User)
#     def create_user_profile(sender, instance, created, **kwargs):
#         if created:
#             Profile.objects.create(user=instance)
#
#     @receiver(post_save, sender=User)
#     def save_user_profile(sender, instance, **kwargs):
#         instance.profile.save()


class Thing(models.Model):
    # user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    name = models.CharField(max_length=20, default=None)
    is_lost = models.BooleanField(default=True)
    note = models.TextField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    Things = models.OneToOneField(Thing,
                                  on_delete=models.CASCADE,
                                  primary_key=True)
    name = models.CharField(max_length=100, default=None)

    def __str__(self):
        return self.name


class Localisation(models.Model):
    things = models.OneToOneField(Thing,
                               on_delete=models.CASCADE)
    longitude = models.CharField(max_length=50, default=None)
    latitude = models.CharField(max_length=50, default=None)
    radius = models.PositiveIntegerField()

    def __str__(self):
        return f'Lng: {self.longitude}, Lat:{self.latitude}, radius:{self.radius}'
