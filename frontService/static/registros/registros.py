#librarys for video
import os
import shutil
import time
import sys

if not os.path.exists(str(sys.argv[1])):
    os.makedirs(str(sys.argv[1]))

#start recording
src = "../live"
dest = "./"+str(sys.argv[1])
src_files = os.listdir(src)
for file_name in src_files:
    full_file_name = os.path.join(src, file_name)
    if os.path.isfile(full_file_name) and full_file_name[-2:]=='ts' and os.path.getsize(full_file_name)>10:
        shutil.copy(full_file_name, dest)
time.sleep(6)
src_files = os.listdir(src)
for file_name in src_files:
    full_file_name = os.path.join(src, file_name)
    if os.path.isfile(full_file_name) and full_file_name[-2:]=='ts' and os.path.getsize(full_file_name)>10:
        shutil.copy(full_file_name, dest)

os.chdir(dest)
names = list()
for file_ in os.listdir("."):
        if file_[-2:]=="ts":
                os.rename(file_, file_[8:])
                names.append(int(file_[8:-3]))

names.sort()
print(names)
with open("mylist.txt", 'w') as names_files:
        for name in names:
                names_files.write("file "+str(name)+".ts\n")

#os.system("(for %i in (*.ts) do @echo file '%i') > mylist.txt")
name=sys.argv[1]
os.system('ffmpeg -f concat -safe 0 -i mylist.txt -c copy '+name+'.mp4')

for file_ in os.listdir("."):
        if file_[-2:]=="ts":
            os.remove(file_)
#end recording

#update html
readFile = open("../../../templates/menu/registros.html")

mensaje = """<h3> Video """+str(name)+" ; Fecha: "+sys.argv[2]+" ; Nivel: "+sys.argv[3]+"""</h3>
<video controls width="320" height="208">
        <source src="{% static 'registros/"""+str(dest)[2:]+"/"+str(name)+""".mp4' %}" type="video/mp4">
        Tu navegador no implementa el elemento <code>video</code>.
    </video>
{% endblock %}"""

lines = readFile.readlines()
lines[-1] = mensaje

readFile.close()

f = open("../../../templates/menu/registros.html",'w')
f.writelines([item for item in lines])

#f.write(mensaje)
f.close()