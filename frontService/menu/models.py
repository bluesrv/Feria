from django.db import models

# Create your models here.
class Alerta(models.Model):
    sala= models.CharField(max_length=100)
    fecha = models.DateTimeField()
