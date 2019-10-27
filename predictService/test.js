
const WebSocket = require('ws');

const client_predict = new WebSocket("ws://localhost:34567"); //La red neuronal de agresividad

client_predict.on('open', function open() {
  console.log("connected to PredictServer")
  client_predict.send(JSON.stringify({event: "addCamera", url:"http://192.168.137.62:8080/audio.wav"}))
});
