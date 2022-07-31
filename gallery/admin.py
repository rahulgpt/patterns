from django.contrib import admin
from .models import GalleryImage

admin.site.site_header = 'Patterns Admin'


class GalleryImageAdmin(admin.ModelAdmin):
    fields = [
        'title',
        'imagesrc',
        'date_uploaded',
        'date_modified',
    ]

    list_display = ('title', 'date_uploaded', 'date_modified')

    readonly_fields = ['date_uploaded', 'date_modified']

    class Meta:
        model = GalleryImage


# Register your models here.
admin.site.register(GalleryImage, GalleryImageAdmin)
