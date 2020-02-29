
let url = require('url')
let http = require('http')
const net = require('net')
const app = require('express')
const WebSocket = require('ws');
var events = require('events');


var cola= [];
var anterior=0;
var eventEmitter = new events.EventEmitter();

//initialize a simple http server
const server = http.createServer(app);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

const client_predict = new WebSocket("ws://localhost:3200"); //La red neuronal de agresividad
const client_register = new WebSocket("ws://localhost:65433"); // Donde se guardan las alarmas
const client_personas = new WebSocket("ws://localhost:3000"); // La red de detectar personas

const threshold=60; //lo probe con una cuestion que tiraba entre 0-100

var connectedToRegister=false;
client_predict.on('open', function open() {
  console.log("connected to PredictServer")
});
client_register.on('open', function open() {
  console.log("connected to registerServer")
});
client_personas.on('open', function open() {
  console.log("connected to PersonServer")
  connectedToRegister=true;

  
});

client_predict.on('message', function(data) {
  console.log(data);
  var msg=JSON.parse(data);
  var id=msg.id;
  var message = msg.nivel;
  console.log(data)

  cola.push(parseFloat(message));
  if (cola.length>4){
    cola.shift();
  }

  let sum =cola.reduce((previous, current) => current += previous);
  let result = sum / cola.length;
  console.log('promedio');
  console.log(result);

  var tiempo=new Date();
  var hora= tiempo.getDate()+'/'+(tiempo.getMonth()+1)+'/'+tiempo.getFullYear()+ '-'+ tiempo.getHours()+':'+tiempo.getMinutes()
  if(result>threshold && connectedToRegister) {
    console.log('alarma');
    anterior=1;
    alerta={'id':id,'hora':hora,'sala':1,'nivel':result};
    client_register.send(JSON.stringify(alerta));
    eventEmitter.emit('alarma');

  }
  else{
      anterior=0;
  }

  console.log(data.toString());
});



client_personas.on('message', function(data){
    console.log("personas:");
    console.log(data);
})


//start our server 
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });
    ws.addEventListener("alarma", function(event){
        ws.send('alarma');

    });
   
  });