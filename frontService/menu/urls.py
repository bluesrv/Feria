from django.urls import path
from django.views.generic import TemplateView

from menu.views import index,camara,registros,login, camaraU,indexU
urlpatterns = [
    path('', index, name='index'),
    path('camara',camara, name='camara'),
    path('registros',registros, name="registros"),
    path('login',login,name="login"),
    path('camaraU',camaraU,name="camaraU"),
    path('indexU',indexU,name="indexU"),
    path('sw.js', (TemplateView.as_view(template_name="sw.js", content_type='application/javascript', )), name='sw.js'),

 ]