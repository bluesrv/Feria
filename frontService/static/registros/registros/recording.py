import datetime
import time
import os


while(True):
    ts = time.time()
    st = datetime.datetime.fromtimestamp(ts).strftime('%d-%m-%y--%H.%M.%S')
    os.popen("ffmpeg -i rtsp://@10.6.43.92:8080/video/h264 -acodec copy -vcodec copy -t 10 ./pru"+st+".mkv")

    #print(int(st2[-5:-3])*60+int(st2[-2:])-int(st[-5:-3])*60-int(st[-2:]))
    files = [f for f in os.listdir('.') if os.path.isfile(f)]
    for f in files:
        if f[-4:] == ".mkv":
        	if (-int(f[-9:-7])*60-int(f[-6:-4])+int(st[-5:-3])*60+int(st[-2:])) > 11:
        		os.remove(f)
    time.sleep(10)