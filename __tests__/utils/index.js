const aedes = require("./aedes.js");
aedes.runMqttServer().then((result) => {
  console.log(result)
})