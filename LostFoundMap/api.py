from rest_framework import routers
from app.api import views as api_views

router = routers.DefaultRouter()
router.register(r'User', api_views.UserViewset)
# router.register(r'Profile', api_views.ProfileViewset)
router.register(r'Thing', api_views.ThingViewset)
router.register(r'Localisation', api_views.LocalisationViewset)