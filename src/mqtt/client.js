var mqtt = require('mqtt')

var opt = {
    port: process.env.MQTT_PORT,
};

var mqttClient = mqtt.connect('mqtt://localhost', opt);

mqttClient.on("connect", ()=>{
  console.log("connect to mqtt on port", opt.port)
})

module.exports = mqttClient