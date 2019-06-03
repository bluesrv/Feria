'use strict'

const fastify = require('fastify')()
let url = require('url')
var EventEmitter = require("events").EventEmitter;
var prediction = new EventEmitter();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

//funcion para probar que envie correctamente
async function predict() {
  while(true) {
    await sleep(2000)
    prediction.emit('newPrediction', 0)
  }
}

fastify.register(require('fastify-ws'))

//iniciar el servidor
fastify.ready(err => {
  if (err) throw err

  console.log('Server started.')
  predict()
  let userSockets = {}

  fastify.ws.on('connection', (socket, request) => {
      console.log('Client connected.')
      let userId = request.url
      userSockets[userId] = socket

      let sendPrediction = function(res) {
        socket.send(res)
      }

      prediction.on('newPrediction', sendPrediction)

      socket.on('close', () => {
        console.log('Client disconnected.')
        prediction.removeListener("newPrediction", sendPrediction);
      })
    })
})

fastify.listen(34567)
