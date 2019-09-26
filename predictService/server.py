import time
import socket
import json
import numpy as np
import read_data

HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
PORT = 65432        # Port to listen on (non-privileged ports are > 1023)

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
            mfcc = read_data.cf.calculate_features(x, 44100, 0)
            mfcc = np.transpose(mfcc)
            mfcc = np.expand_dims(mfcc, axis=0).tolist()
            response = json.dumps(mfcc)
            conn.send(response.encode('utf-8'))
