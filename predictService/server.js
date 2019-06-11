'use strict'

const fastify = require('fastify')()
const tf = require("@tensorflow/tfjs-node");
let url = require('url')
let http = require('http')
const fs = require('fs')
var wav = require('wav');
var EventEmitter = require("events").EventEmitter
var prediction = new EventEmitter();
var Meyda = require("meyda")
const Stream = require('stream')
const request = require('request')


function convertBlock(incomingData, n) { // incoming data is a UInt8Array
    var i, l = incomingData.length;
    var outputData = new Float32Array(incomingData.length);
    for (i = 0; i < l; i++) {
        outputData[i] = (incomingData[i]) / ((2**n)/1.0);
    }
    return outputData;
}

function convertTypedArray(src, type) {
    var buffer = new ArrayBuffer(src.byteLength);
    var baseView = new src.constructor(buffer).set(src);
    return new type(buffer);
}

async function predict() {

  const model = await tf.loadLayersModel('file://model/model.json');

  var tWindow = 512
  var count = 0
  var dataArray = []
  var frame = []

  var stream = new Stream.Readable({
    read(size){
      stream.pause()
    }
  })

  var aux = 0;
  stream.on('readable', () => {
    let chunk;
    while (null !== (chunk = stream.read(tWindow*2))) {
      var ta = convertTypedArray(chunk, Int16Array)
      ta = convertBlock(ta, 16)

      Meyda.numberOfMFCCCoefficients = 25;
      var coefs = Meyda.extract('mfcc', ta)

      var sum = 0
      for (var i = 0; i < coefs.length; i++) {
        sum += coefs[i]
      }

      dataArray.push([sum/25])
      if (count == 172) {
        count = 0
        readable.push(dataArray)
        dataArray = []

      } else {
        count += 1
      }

  }

})

  var readable = new Stream.Readable({objectMode: true,
    read(size) {
      readable.pause()
    }}
  )

  readable.on('readable', () => {
    let chunk;
    while (null !== (chunk = readable.read())) {
      console.log(chunk)

      var wrap = []
      wrap.push(chunk)
      wrap = tf.tensor(wrap)
      var tensorData = model.predict(wrap)
      console.log(tensorData[0])

      prediction.emit('newPrediction', tensorData[0])
    }
  });

  const myWritable = new Stream.Writable({
    write(chunk, encoding, next) {
      stream.push(chunk)
      next()
    }
  });

  var wav = require('wav');
  var reader = new wav.Reader();

  reader.on('format', function (format) {
    console.log(format)
    reader.pipe(myWritable);
  });

  var ffmpeg = require('fluent-ffmpeg')
  ffmpeg('audio1.wav')
    .audioChannels(1)
    .format('wav')
    .pipe(reader)


  }

fastify.register(require('fastify-ws'))

//iniciar el servidor
fastify.ready(err => {
  if (err) throw err

  console.log('Server started.')
  predict()

  fastify.ws.on('connection', (socket, request) => {
      console.log('Client connected.')

      let sendPrediction = function(res) {
        socket.send(res)
      }

      prediction.on('newPrediction', sendPrediction)

      socket.on('close', () => {
        prediction.removeListener("newPrediction", sendPrediction)
        console.log('Client disconnected.')
      })
    })
})

fastify.listen(34567)
