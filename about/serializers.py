from rest_framework import serializers
from .models import AboutDetail


class AboutSerializer(serializers.ModelSerializer):
    image_width = serializers.SerializerMethodField()
    image_height = serializers.SerializerMethodField()

    class Meta:
        model = AboutDetail
        fields = ['image', 'heading1', 'heading2',
                  'paragraph', 'image_width', 'image_height']

    def get_image_width(self, obj):
        return obj.get_image_width()

    def get_image_height(self, obj):
        return obj.get_image_height()
