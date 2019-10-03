#librarys for video
import os
import shutil
import time
import sys
import time
import datetime

'''
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
os.chdir("./..")
'''

#update html
readFile = open("./Front/src/pages/Registros.vue")

mensaje = """<h3> Video """+sys.argv[1]+" </h3> <h5>Fecha: "+sys.argv[2]+" </h5> <h5>Nivel: "+sys.argv[3]+ """</h5>
<video controls width="320" height="208">
        <source src='./../../../data/"""+str(sys.argv[1])+""".mkv' type="video/mp4">
        Tu navegador no implementa el elemento <code>video</code>.
</video>
<h3> &iquestEs una situaci&oacuten de violencia?</h3>
<button input name="""+sys.argv[1]+"""1 id='"""+sys.argv[1]+"""1' v-on:click="desactivar("""+sys.argv[1]+"""1,'"""+sys.argv[1]+"""1,"""+sys.argv[1]+"""2')">S&iacute lo es</button>
<button input name="""+sys.argv[1]+"""2 id='"""+sys.argv[1]+"""2' v-on:click="alarma("""+sys.argv[1]+"""); desactivar("""+sys.argv[1]+"""1,'"""+sys.argv[1]+"""1,"""+sys.argv[1]+"""2')">No lo es</button>
"""

lines = readFile.readlines()
finals = lines[-27:]
inicials = lines[:-27]
new=inicials.append(mensaje)
new2=inicials+finals

readFile.close()

f = open("./Front/src/pages/Registros.vue",'w')
f.writelines([item for item in new2])
f.close()