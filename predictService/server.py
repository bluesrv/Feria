import time
import socket
import json
import numpy as np
import librosa

HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
PORT = 3000        # Port to listen on (non-privileged ports are > 1023)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    print('sever started')
    s.listen()
    conn, addr = s.accept()
    with conn:
        print('Connected by', addr)
        while True:
            data = conn.recv(352800)
            x = np.frombuffer(data, np.float32)
            mfcc = np.mean(librosa.feature.mfcc(y=x, sr=44100, n_mfcc=25, hop_length=512), axis=0).reshape(-1,1)
            mfcc = np.expand_dims(mfcc, axis=0).tolist()
            #response.reverse()
            response=json.dumps(mfcc)
            #print(response)
            conn.send(response.encode('utf-8'))
