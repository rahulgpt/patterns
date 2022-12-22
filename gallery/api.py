from .models import GalleryImage
from rest_framework import viewsets, permissions
from .serializers import GallerySerializer
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

# Gallery Viewset

class GalleryViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all().order_by('order')
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GallerySerializer

    @method_decorator(cache_page(60 * 60 * 24))
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

