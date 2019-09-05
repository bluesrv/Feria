
var websocket = new WebSocket("ws://localhost:3000/");
var wsAlarma= new WebSocket("ws://localhost:65433/");
var cont=0;

websocket.onopen = function(evt) { onOpen(evt) };
websocket.onclose = function(evt) { onClose(evt) };
websocket.onmessage = function(evt) { onMessage(evt) };
websocket.onerror = function(evt) { onError(evt) };
wsAlarma.onopen = function(evt) { onOpenA(evt) };
wsAlarma.onerror = function(evt) { onErrorA(evt) };

var cola= [];
function onOpenA(evt) {
  console.log('se conectoooa');
}

function onOpen(evt) {
  console.log('se conectooo')
}
function onClose(evt) {
  console.log('se cayooo')
}

function onMessage(evt) {
// There are two types of messages:
  // 1. a chat participant message itself
  // 2. a message with a number of connected chat participants
  var message = evt.data;
  var z = document.getElementById("recived");
  z.value = message;
  var n_alertas= document.getElementById("alertitas");

  var event = new Event('change');
  cola.push(parseFloat(message));
  if (cola.length>6){
    cola.shift();
  }
  let sum =cola.reduce((previous, current) => current += previous);
  let result = sum / cola.length;
  console.log(sum);
  console.log(result);
  var tiempo=new Date();
  var hora= tiempo.getDate()+'/'+(tiempo.getMonth()+1)+'/'+tiempo.getFullYear()+ '-'+ tiempo.getHours()+':'+tiempo.getMinutes()
  if(result>60){
    console.log('alarma');
    n_alertas.value=message;
    n_alertas.dispatchEvent(event);
    cont+=1;
    alerta={'id':cont,'hora':hora,'sala':1,'nivel':result};
    wsAlarma.send(JSON.stringify(alerta));

  }

  z.dispatchEvent(event);

}

function onError(evt) {
  console.log('errooor');
}
function onErrorA(evt) {
  console.log(evt);
}


function addMessage() {
  var message = chat.value;
  chat.value = "";
  websocket.send(message);
}


