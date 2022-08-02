from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from dj_rest_auth.registration.views import SocialLoginView


@api_view()
def null_view(request):
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view()
def complete_view(request):
    return Response("Email account is activated")
