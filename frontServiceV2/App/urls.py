from django.urls import include, path
from rest_framework import routers
from . import views
from django.conf.urls import url


router = routers.SimpleRouter()
router.register(r'alerts', views.AlertViewSet)
router.register(r'users', views.UserViewSet, base_name='users')


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'', include(router.urls))
]



