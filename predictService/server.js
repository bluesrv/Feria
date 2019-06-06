// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Connect to streaming

function camera(){
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
}

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
