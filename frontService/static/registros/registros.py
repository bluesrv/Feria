import socket

#librarys for video
import os
import shutil
import time

mi_socket= socket.socket()
mi_socket.bind(('localhost',8080))
mi_socket.listen(1) #conecciones posibles
bool=True
while bool:
    conexion, addr=mi_socket.accept()
    print(addr)
    peticion=conexion.recv(1024)
    output = 'informacion recibida'
    conexion.sendall(output.encode('utf-8'))
    info=peticion.split()
    if(info[0]=="cerrar"):
        bool=False

    #start recording
    src = "../live"
    dest = "."
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
    name='1'
    os.system('ffmpeg -f concat -safe 0 -i mylist.txt -c copy '+name+'.mp4')

    for file_ in os.listdir("."):
            if file_[-2:]=="ts":
                os.remove(file_)
    #end recording


    print(info)
    #conexion.send("mensaje servidor -> cliente")
    conexion.close()
