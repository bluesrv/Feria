from django.shortcuts import render

from django.http import HttpResponse


def index(request):
    return render(request,'menu/index.html')
def camara(request):
	return render(request,'menu/camara.html')