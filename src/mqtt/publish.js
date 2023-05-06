const mqttClient = require('./client')

const publish = async (topic, data ) => {
  mqttClient.publish(topic, JSON.stringify(data))
  return
}

module.exports = {publish}