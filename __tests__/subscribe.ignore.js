const mqtt = require('mqtt');

var opt = {
  port: process.env.MQTT_SOCKET_PORT || 1884,
};

var mqttClient = mqtt.connect('ws://127.0.0.1', opt);


mqttClient.on("connect", ()=>{
            
  console.log("test connect to mqtt on port", opt.port)
  
  mqttClient.subscribe("/factory", () => {
    console.log("sucscribe")
    
    mqttClient.on("message", (topic, payload, packet) => {
      
      // expect(topic).toEqual("/factory");
      // expect(payload.toString()).toEqual(reqPayload.toString())
      console.log(payload.toString())
      

    })
    

  })
})
