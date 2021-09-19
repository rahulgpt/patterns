from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('gallery.urls')),
    path('api/', include('about.urls')),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/', include('emailverification.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/shop/', include('shop.urls', namespace='shop')),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
