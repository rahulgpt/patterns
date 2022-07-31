from rest_framework import serializers
from .models import GalleryImage

# GalleryImage Serializers

class GallerySerializer(serializers.ModelSerializer):
    image_width = serializers.SerializerMethodField()
    image_height = serializers.SerializerMethodField()

    class Meta:
        model = GalleryImage
        fields = ['id', 'title', 'imagesrc',
                  'image_width', 'image_height']

    def get_image_width(self, obj):
        return obj.get_image_width()

    def get_image_height(self, obj):
        return obj.get_image_height()
