from django.urls import path
from django.views.generic import TemplateView

from menu.views import index,camara
urlpatterns = [
    path('', camara, name='camara'),
    path('camara',camara, name='camara'),
    path('sw.js', (TemplateView.as_view(template_name="sw.js", content_type='application/javascript', )), name='sw.js'),

 ]