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
const net = require('net')


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

  var client = new net.Socket();
  client.connect(65432, '127.0.0.1', function() {
    console.log('Connected');
  });

  const model = await tf.loadLayersModel('file://model/model.json');

  var tWindow = 88200
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
      //console.log(ta)
      ta = convertTypedArray(ta, Uint8Array)
      ta = Buffer.from(ta)
      //console.log(ta.length)
      client.write(ta)
      //dataArray.push(mfccs)

  }

})

client.on('data', function(data) {
  var parsed = JSON.parse(data)
	readable.push(parsed)

});

  var readable = new Stream.Readable({objectMode: true,
    read(size) {
      readable.pause()
    }}
  )

  readable.on('readable', () => {
    let chunk
    while (null !== (chunk = readable.read())) {
      var tensor = model.predict(tf.tensor(chunk))
      var tensorData = tensor.dataSync()
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
  ffmpeg('http://192.168.137.254:8080/audio.wav')
    .noVideo()
    .audioFrequency(44100)
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
