  // request is just an enhanced HTTP request. For more info 
var Server = require('ws').Server;
var port = process.env.PORT || 3000;
var ws = new Server({port: 3000});

var sockets = [];
var a;
ws.on('connection', function(w){
  console.log('connection');
  
  w.send('0');
  w.on('message', function(msg){
    var id = w.upgradeReq.headers['sec-websocket-key'];
    var message = JSON.parse(msg);
    
    sockets[message.to].send(message.message);

    console.log('Message on :: ', id);
    console.log('On message :: ', msg);
  });
  
  w.on('close', function() {
    var id = w.upgradeReq.headers['sec-websocket-key'];
    console.log('Closing :: ', id);
  });


  for (var i = 1; i <= 1000; i++) {
    var j=Math.random()*100;
    w.send(j);
    a=sleep(1);
  }

});

function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}
function sleep(n) {
  msleep(n*1000);
}

