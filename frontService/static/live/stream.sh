#!/bin/bash
#VIDSOURCE="rtsp://feria:feria_123@10.6.40.236:554/videoSub"
VIDSOURCE="rtsp://10.6.40.240:8080/h264_ulaw.sdp"
AUDIO_OPTS="-c:a aac"
VIDEO_OPTS="-s 640x480 -c:v libx264"
#AUDIO_OPTS="-c:a aac -b:a 160000 -ac 2"
#VIDEO_OPTS="-c:v libx264 -b:v 800000"
OUTPUT_HLS="-hls_time 2 -hls_list_size 5 -start_number 1 -hls_flags delete_segments"
ffmpeg -i "$VIDSOURCE" -y $AUDIO_OPTS $VIDEO_OPTS $OUTPUT_HLS  mystream.m3u8
