from django.conf.urls import url, include
from django.urls import path
from . import views

urlpatterns = [
    # Override urls
    url(r'^registration/account-email-verification-sent/',
        views.null_view, name='account_email_verification_sent'),
    url(r'^registration/complete/$', views.complete_view,
        name='account_confirm_complete'),
    url(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.null_view, name='password_reset_confirm'),
    # Default urls
]
