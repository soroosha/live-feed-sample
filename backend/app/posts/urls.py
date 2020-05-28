# chat/urls.py
from django.urls import path

from . import views

urlpatterns = [
    path('', views.PostsView.as_view(), name='posts'),
    path('post/', views.PostView.as_view(), name='post'),
]
