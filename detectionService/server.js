const fastify = require('fastify')();
const EventEmitter = require("events").EventEmitter
const pubsub = new EventEmitter();
const predictor = require('./predictor');

fastify.register(require('fastify-ws'));

//iniciar el servidor
fastify.ready(err => {
    if (err) throw err
  
    console.log('Server started.');

    predictor(pubsub);
  
    fastify.ws.on('connection', (socket, request) => {
        console.log('Client connected.');
  
        let sendDetection = function(value) {
          socket.send(value);
        }
  
        pubsub.on('detection', sendDetection);
  
        socket.on('close', () => {
          pubsub.removeListener("newPrediction", sendDetection);
          console.log('Client disconnected.');
        })
      })
  })
  
  fastify.listen(42069);