
    //Camera Authentication
    var ip_address = "192.168.1.110"
    //camera username and password
    var username = "feria";
    var password="feria2019";
    var port='554'

    //A channel of camera stream
    Stream = require('node-rtsp-stream');
    stream = new Stream({
        streamUrl: 'rtsp://'+username+':'+password+'@'+ip_address+':'+port+'/videoSub',
        wsPort: 9999    
    });
