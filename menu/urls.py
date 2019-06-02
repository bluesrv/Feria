from django.urls import path

from.import views
from menu.views import index
urlpatterns = [
    path('', index),
 ]