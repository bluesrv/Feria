const ffmpeg = require('fluent-ffmpeg');
require('@tensorflow/tfjs-node');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const buildPrediction = require('./predictFunction');
const buildHandlerPrediction = require('./handler');

async function initPredictor(pubsub){
  console.log("predictor initialized!");

  const model = await cocoSsd.load({
    base: 'mobilenet_v2'
  });
  console.log("model loaded!");

  const handlePrediction = buildHandlerPrediction(pubsub);
  const predictFunc = buildPrediction(model, handlePrediction);
  
  let lastProcesed = 1;

  ffmpeg('rtsp://10.6.43.52:8080/h264_ulaw.sdp')
  .noAudio()
  .videoCodec('libx264')
  .size('640x?')
  .aspect("4:3")
  .fps(1/2)
  .outputOptions('-y')
  .outputOptions('-vcodec png')
  .format('image2')
  .save('temp%d.png')
  .on('progress', (progress) => {
    if(progress.frames !== lastProcesed){
      console.log(`Predicting frame ${lastProcesed}:`);
      predictFunc(progress.frames - 1);
      lastProcesed = progress.frames;
    }
  })
}

module.exports = initPredictor;