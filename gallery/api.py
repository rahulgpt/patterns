from .models import GalleryImage
from rest_framework import viewsets, permissions
from .serializers import GallerySerializer

# Gallery Viewset


class GalleryViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all().order_by('-date_uploaded')
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GallerySerializer
