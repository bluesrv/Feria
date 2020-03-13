import datetime
import time
import os

path_sala1 = "./sala1"
path_sala2 = "./../sala2"

os.chdir(path_sala1)
files = [os.remove(f) for f in os.listdir('.') if (os.path.isfile(f) and f[-4:] == '.mkv')]
os.chdir(path_sala2)
files = [os.remove(f) for f in os.listdir('.') if (os.path.isfile(f) and f[-4:] == '.mkv')]

path_sala1 = "./../sala1"
os.chdir(path_sala1)
while(True):
    ts = time.time()
    st = datetime.datetime.fromtimestamp(ts).strftime('%d-%m-%y--%H.%M.%S')
    
    os.popen("ffmpeg -i rtsp://@10.6.40.235:8080/h264_ulaw.sdp -acodec copy -vcodec copy -t 10 ./sala1_"+st+".mkv")
    os.chdir(path_sala2)
    os.popen("ffmpeg -i rtsp://@10.6.40.245:8080/h264_ulaw.sdp -acodec copy -vcodec copy -t 10 ./sala2_"+st+".mkv")

    files = [f for f in os.listdir('.') if os.path.isfile(f)]
    for f in files:
        if f[-4:] == ".mkv":
            print(f, (-int(f[-9:-7])*60-int(f[-6:-4])+int(st[-5:-3])*60+int(st[-2:])))
            if (-int(f[-9:-7])*60-int(f[-6:-4])+int(st[-5:-3])*60+int(st[-2:])) > 11:
                os.remove(f)

    os.chdir(path_sala1)
    files = [f for f in os.listdir('.') if os.path.isfile(f)]
    for f in files:
        if f[-4:] == ".mkv":
            print(f, (-int(f[-9:-7])*60-int(f[-6:-4])+int(st[-5:-3])*60+int(st[-2:])))
            if (-int(f[-9:-7])*60-int(f[-6:-4])+int(st[-5:-3])*60+int(st[-2:])) > 11:
                os.remove(f)
    time.sleep(10)