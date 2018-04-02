from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^new_note$', views.new_note),
    url(r'^notes/(?P<id>\d+)/delete', views.delete),
    url(r'^notes/(?P<id>\d+)/update', views.update),
]