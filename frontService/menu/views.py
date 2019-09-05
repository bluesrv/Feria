from django.shortcuts import render

from django.http import HttpResponse


def index(request):
    return render(request,'menu/index.html')
def camara(request):
	return render(request,'menu/camara.html')
def registros(request):
	return render(request,'menu/registros.html')
def login(request):
	return render(request,'base/login.html')
def indexU(request):
	return render(request,'menu/indexU.html')
def camaraU(request):
	return render(request,'menu/camaraU.html')