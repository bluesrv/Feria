const cv = require('opencv4nodejs');
const path = require('path');
const express =  require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const FPS = 15;
const wCap = new cv.VideoCapture('rtsp://feria:feria2019@192.168.43.14:554/videoMain');

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, 'templates/menu/camara.html'));
});

setInterval(() => {
    const frame = wCap.read();
    const image = cv.imencode('.jpg',frame).toString('base64');
    io.emit('image',image);
},1000/FPS)


server.listen('4000');