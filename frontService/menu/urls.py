from django.urls import path

from.import views
from menu.views import index,camara,registros
urlpatterns = [
    path('', index, name='index'),
    path('camara',camara, name='camara'),
    path('registros',registros, name="registros"),
 ]