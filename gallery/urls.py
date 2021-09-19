from rest_framework import routers
from .api import GalleryViewSet

router = routers.DefaultRouter()
router.register('gallery', GalleryViewSet, 'gallery')

urlpatterns = router.urls
