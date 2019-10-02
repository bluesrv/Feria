const ffmpeg = require('fluent-ffmpeg');
require('@tensorflow/tfjs-node');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const buildPrediction = require('./predictFunction');
const buildHandlerPrediction = require('./handler');
const net = require('net');

async function initPredictor(){
  console.log("predictor initialized!");

  // Esta es la conexión al front!
  var client = new net.Socket(); 
  client.connect(65432, '127.0.0.1', function() {
    console.log('Connected');
  });

  const model = await cocoSsd.load({
    base: 'mobilenet_v2'
  });
  console.log("model loaded!");

  const handlePrediction = buildHandlerPrediction(client);
  const predictFunc = buildPrediction(model, handlePrediction);
  
  var lastProcesed = 1;

  ffmpeg('rtsp://192.168.43.3:8080/h264_ulaw.sdp')
  .noAudio()
  .videoCodec('libx264')
  .size('640x?')
  .aspect("4:3")
  .fps(1)
  .outputOptions('-y')
  .outputOptions('-vcodec png')
  .format('image2')
  .save('temp%d.png')
  .on('progress', (progress) => {
    if(progress.frames !== lastProcesed){
      console.log(`Predicting frame ${lastProcesed}:`);
      predictFunc(progress.frames - 1);
      lastProcesed = progress.frames
    }
  })
}

initPredictor();