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


function convertBlock(incomingData) { // incoming data is a UInt8Array
    var i, l = incomingData.length;
    var outputData = new Float32Array(incomingData.length);
    for (i = 0; i < l; i++) {
        outputData[i] = (incomingData[i] - 128) / 128.0;
    }
    return outputData;
}

async function predict() {

  const model = await tf.loadLayersModel('file://model/model.json');

  var tWindow = 1764
  var count = 0
  var dataArray = []
  var frame = []

  var stream = new Stream.Readable({
    read(size){
      stream.pause()
    }
  })

  stream.on('readable', () => {
    let chunk;
    while (null !== (chunk = stream.read(tWindow))) {

      var ta = convertBlock(chunk)
      var array =  Array.prototype.slice.call(ta)
      array = array.concat(new Array(284).fill(0))
      Meyda.numberOfMFCCCoefficients = 22;
      var coefs = Meyda.extract('mfcc', array)
      if (count == 25) {
        count = 0
        readable.push(dataArray)
        dataArray = []

      } else {
        count += 1
        dataArray.push(coefs)
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
      var wrap = []
      wrap.push(chunk)
      wrap = tf.tensor(wrap)
      var tensorData = model.predict(wrap).dataSync()
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

  var reader = new wav.Reader();
  reader.on('format', function (format) {
    reader.pipe(myWritable);
  });

  request('http://192.168.100.74:8080/audio.wav').pipe(reader)

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
