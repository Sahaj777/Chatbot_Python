from django.urls import path

from . import views

urlpatterns = [
    path('getResponse', views.index, name='index'),
    path('sendJson', views.sendJson, name='sendJson'),
    path('checkGreetings', views.checkGreetings, name='checkGreetings'),
]