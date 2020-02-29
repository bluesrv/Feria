#librarys for video
import os
import shutil
import time
import sys
import time
import datetime


#start recording
src = "./registros" #Origen
dest = "./data" #destino
names=[]
src_files = os.listdir(src)
for file_name in src_files:
    full_file_name = os.path.join(src, file_name)
    if os.path.isfile(full_file_name) and full_file_name[-3:]=='mkv' and os.path.getsize(full_file_name)>100:
            shutil.copy(full_file_name, dest)
            break

time.sleep(8)
src_files = os.listdir(src)
for file_name in src_files:
    full_file_name = os.path.join(src, file_name)
    if os.path.isfile(full_file_name) and full_file_name[-3:]=='mkv' and os.path.getsize(full_file_name)>100:
        shutil.copy(full_file_name, dest)
        break

src_files = os.listdir(dest)
for file_name in src_files:
    full_file_name = os.path.join(dest, file_name)
    print(full_file_name)
    if os.path.isfile(full_file_name) and full_file_name[7]=='p' and os.path.getsize(full_file_name)>100:
        names.append(file_name)


os.chdir(dest)
print(names)
with open("mylist.txt", 'w') as names_files:
        for name in names:
            names_files.write("file "+str(name)+"\n")

os.system('ffmpeg -f concat -safe 0 -i mylist.txt -c copy '+str(sys.argv[1])+'.mkv')


for file_ in os.listdir("."):
        if file_[0]=="p":
            os.remove(file_) 
#end recording


#update html
readFile = open("../../../templates/menu/registros.html")

mensaje = """<h3> Video """+sys.argv[1]+" </h3> <h5>Fecha: "+sys.argv[2]+" </h5> <h5>Nivel: "+sys.argv[3]+ """</h5>
<video controls width="320" height="208">
        <source src="{% static 'registros/"""+"data"+"/"+str(sys.argv[1])+""".mkv' %}" type="video/mp4">
        Tu navegador no implementa el elemento <code>video</code>.
</video>
<h4> La alarma es correcta </h4>
<input type="submit" value="Si" />
<input type="submit" value="No" />

{% endblock %}"""

lines = readFile.readlines()
lines[-1] = mensaje

readFile.close()

f = open("../../../templates/menu/registros.html",'w')
f.writelines([item for item in lines])

#f.write(mensaje)
f.close()