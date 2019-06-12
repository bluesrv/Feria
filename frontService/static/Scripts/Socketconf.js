console.log('hola');
var websocket = new WebSocket("ws://10.11.7.5:34567/");

websocket.onopen = function(evt) { onOpen(evt) };
websocket.onclose = function(evt) { onClose(evt) };
websocket.onmessage = function(evt) { onMessage(evt) };
websocket.onerror = function(evt) { onError(evt) };

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
  z = document.getElementById("recived");
  z.value = message;
  var event = new Event('change');
  z.dispatchEvent(event);
}

function onError(evt) {
  console.log('erooor')
}


function addMessage() {
  var message = chat.value;
  chat.value = "";
  websocket.send(message);
}

