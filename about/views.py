from .models import AboutDetail
from rest_framework import viewsets, permissions
from .serializers import AboutSerializer

# Gallery Viewset


class AboutViewSet(viewsets.ModelViewSet):
    queryset = AboutDetail.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = AboutSerializer
