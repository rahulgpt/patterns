from collections import OrderedDict
from rest_framework import routers
from .api import GalleryViewSet

router = routers.DefaultRouter()
router.register('', GalleryViewSet, 'gallery')

urlpatterns = router.urls
