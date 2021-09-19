from rest_framework import routers
from .views import AboutViewSet

router = routers.DefaultRouter()
router.register('about', AboutViewSet, 'about')

urlpatterns = router.urls
