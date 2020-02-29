const cv = require('opencv4nodejs');
const path = require('path');
const express =  require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const FPS = 30;
const wCap = new cv.VideoCapture('rtsp://192.168.0.30:8080/h264_ulaw.sdp');

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, 'templates/menu/camara.html'));
});

setInterval(() => {
    const frame = wCap.read();
    const image2 = cv.imencode('.jpg',frame).toString('base64');
    io.emit('image2',image2);
},1000/FPS)


server.listen('4010');