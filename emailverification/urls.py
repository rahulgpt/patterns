from django.conf.urls import url, include
from allauth.account.views import ConfirmEmailView, LoginView
from django.urls import path
from . import views
from .views import FacebookLogin

urlpatterns = [
    # Override urls
    url(r'^registration/account-email-verification-sent/',
        views.null_view, name='account_email_verification_sent'),
    path('login/', LoginView.as_view(), name='account_login'),
    path('auth/registration/', LoginView.as_view(), name='account_signup'),
    url(r'^registration/account-confirm-email/(?P<key>[-:\w]+)/$',
        ConfirmEmailView.as_view(), name='account_confirm_email'),
    url(r'^registration/complete/$', views.complete_view,
        name='account_confirm_complete'),
    url(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.null_view, name='password_reset_confirm'),
    # Default urls
    path('facebook/', FacebookLogin.as_view(), name='fb_login')
]
