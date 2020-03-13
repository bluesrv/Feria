  // request is just an enhanced HTTP request. For more info 
var fs = require('fs')
var Server = require('ws').Server;
const exec = require('child_process').exec;  
var port = process.env.PORT || 65433;
var ws = new Server({port: 65433});
const request = require('request');



var sockets = [];
var a;
ws.on('connection', function(w){
  console.log('connection');
  
  w.send('0');
  w.on('message', function(msg){
    
    var message = JSON.parse(msg);

    if(message.sala=='1'){
      exec('python registro.py '+message.id+' '+message.hora+" "+message.nivel+ " "+message.sala, (err, stdout, stderr) => {  
        if (err) {  
          console.error(err);  
          return;  
        }  
        console.log(stdout);  
      });  
      
    }
    else{
      exec('python registro2.py '+message.id+' '+message.hora+" "+message.nivel+ " "+message.sala, (err, stdout, stderr) => {  
        if (err) {  
          console.error(err);  
          return;  
        }  
        console.log(stdout);  
      });  

    }

    var mess={
      id2:message.id,
      room: message.sala,
      level: message.nivel,
      route: "registros_sala"+message.sala+"/"+message.id+".mkv"
    }

    request.post('http://127.0.0.1:8000/api/alerts/', {
                json: mess
                }, (error, res, body) => {
                    if (error) {
                    console.error(error)
                    return
                    }
                    console.log(`statusCode: ${res.statusCode}`)
                    console.log(body)
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

