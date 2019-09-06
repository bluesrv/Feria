
id='1'
readFile = open("../../templates/menu/registros.html")

mensaje = """<h2> Video """+id+"""</h2>
<video controls width="640" height="480">
        <source src="{% static 'registros/"""+id+""".mp4' %}" type="video/mp4">
        Tu navegador no implementa el elemento <code>video</code>.
    </video>
{% endblock %}"""

lines = readFile.readlines()
lines[-1] = mensaje

readFile.close()

f = open("../../templates/menu/registros.html",'w')
f.writelines([item for item in lines])

#f.write(mensaje)
f.close()
