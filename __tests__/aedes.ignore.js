// @吳尚恩
const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);
const httpServer = require('http').createServer()
const ws = require('websocket-stream')
const port = process.env.MQTT_PORT || 1885;
const wsPort = 1884;
const EventEmitter = require('events');
const myEmitter = new EventEmitter();
const listenCheckList = [false, false]

// create server

const runMqttServer = () => {


  

// Create a new EventEmitter instance
  

  // Attach an event listener
  



  server.listen(port, (err, res) => {
    if (err) {
      console.error(err);
      reject(err)
    }
    console.log("server started and listening on port ", port);
    myEmitter.emit('listenOnPort', 0);
  });
  // Emit the event
  

  
  ws.createServer({
  	server: httpServer
    }, aedes.handle)
  
  httpServer.listen(wsPort, function () {
  	console.log('websocket server listening on port', wsPort)
    myEmitter.emit('listenOnPort', 1);
  })  
  
  



  
  
 
  
 
  aedes.on("client", (client) => {
    console.log("New client connect: ", client.id);
  });
  
  // client on ready
  aedes.on("clientReady", (client) => {
    console.log(client.id, " is ready");
  });
  
  //client on subscribe
  aedes.on("subscribe", (subscriptions, client) => {
    console.log(client.id, " subscribe on ", subscriptions[0].topic);
  });
  
  // handle publish
  aedes.on("publish", (packet, client) => {
    // print out the message
    if(client == null)
      client = { id: '' }
    console.log(client.id, " publish on ", packet.topic, ": ", packet.payload.toString());
  });
  // msg published should be a JSON object:
  // {
  //     "from": "clientId",
  //     "msg" : "msg content...",
  //     "timestamp" : "UTC 1234"
  // }
}


runMqttServer()