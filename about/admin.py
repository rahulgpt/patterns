from django.contrib import admin
from .models import AboutDetail


class AboutAdmin(admin.ModelAdmin):
    fields = [
        'image',
        'heading1',
        'heading2',
        'paragraph',
        'date_modified'
    ]

    list_display = ('heading2', 'date_modified')

    readonly_fields = ['date_modified']

    class Meta:
        model = AboutDetail


admin.site.register(AboutDetail, AboutAdmin)
