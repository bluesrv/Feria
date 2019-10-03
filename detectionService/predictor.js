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
  
  let toProcess = 0;
  let flag = true;

  ffmpeg('rtsp://192.168.1.174:8080/h264_ulaw.sdp')
  .noAudio()
  .videoCodec('libx264')
  .size('640x?')
  .aspect("4:3")
  .fps(1/2)
  .outputOptions('-y')
  .outputOptions('-vcodec png')
  .outputOptions('-flush_packets 1')
  .save('temp%d.png')
  .on('progress', async (progress) => {
    if(flag){
      toProcess = progress.frames;
      flag = false;
    }
    if(progress.frames !== toProcess){
      console.log(`Predicting frame ${toProcess - 1}:`);
      await predictFunc(toProcess - 1);
      toProcess = toProcess + 1;
    }
  })
}

module.exports = initPredictor;