  // request is just an enhanced HTTP request. For more info 
var fs = require('fs')
var Server = require('ws').Server;
const exec = require('child_process').exec;  
var port = process.env.PORT || 65433;
var ws = new Server({port: 65433});



var sockets = [];
var a;
ws.on('connection', function(w){
  console.log('connection');
  
  w.send('0');
  w.on('message', function(msg){
    
    var message = JSON.parse(msg);
    
    exec('python registro.py'+message.id, (err, stdout, stderr) => {  
      if (err) {  
        console.error(err);  
        return;  
      }  
      console.log(stdout);  
    });  

    var log=message.id+';'+message.hora+';'+message.nivel+';'+message.sala+'\n';

    fs.appendFile('log.txt', log, function (err) {
      if (err) {
        // append failed
      } else {
        // done
      }
    })
  });
  
  w.on('close', function() {
    var id = w.upgradeReq.headers['sec-websocket-key'];
    console.log('Closing :: ', id);
  });




});



function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}
function sleep(n) {
  msleep(n*1000);
}

