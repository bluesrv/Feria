import librosa
import numpy as np
import glob
import os
import pandas as pd
import calculate_features as cf

def split(l, n):
    n = max(1, n)
    return [l[i:i+n] for i in range(0, len(l), n)]

def read_audios(audio_path, label_path):
    utt = 88200 #deje "utterance" fijo en 2s por la forma en que tenemos etiquetado,
                #hacer una por cada ventana etiquetada como violencia iba a quedar muy largo (ventanas de mas de 10s)

    audio_files = sorted(glob.glob(audio_path + "/*"))
    label_files = sorted(glob.glob(label_path + "/*"))

    df = pd.DataFrame()
    data = []
    labels = []

    for i, file in enumerate(label_files):
        etiquetasdf = pd.read_csv(file, sep=";")['grito']
        audio, sr = librosa.load(audio_files[i], sr=44100)
        split_audio = split(audio, utt)
        split_audio[-1] = np.pad(split_audio[-1], (0, utt-split_audio[-1].shape[0]), 'constant', constant_values=0)

        if  len(split_audio) > etiquetasdf.shape[0]:
            split_audio = split_audio[:etiquetasdf.shape[0]]
        elif len(split_audio) < etiquetasdf.shape[0]:
            etiquetasdf = etiquetasdf[:len(split_audio)]

        for isa, sa in enumerate(split_audio):
            labels.append(etiquetasdf[isa])
            data.append(sa)

    return np.array(data), np.array(labels)
