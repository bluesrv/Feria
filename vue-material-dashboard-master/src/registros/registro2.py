#librarys for video
import os
import shutil
import time
import sys
import time
import datetime


#start recording
src = "./sala2" #Origen
dest = "./registros_sala2" #destino
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
    if os.path.isfile(full_file_name) and file_name[-4:]=='.mkv' and os.path.getsize(full_file_name)>100:
        names.append(file_name)


os.chdir(dest)
with open("mylist.txt", 'w') as names_files:
    for name in names:
        print(name)
        names_files.write("file "+str(name)+"\n")


os.system('ffmpeg -f concat -safe 0 -i mylist.txt -c copy '+str(sys.argv[1])+'.mkv')


for file_ in os.listdir("."):
        if file_[0:4]=="sala":
            os.remove(file_) 
#end recording
