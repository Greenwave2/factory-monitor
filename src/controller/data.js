const mqtt = require('../mqtt/publish.js')
const uploadData = async (req, res) => {
  const data = req.body.result
  console.log(data)
  const topic = "/factory"
  try {
    await mqtt.publish(topic, data)
    res.status(200).json({message: "success"})
  }
  catch (error) {
    console.error("\n********** PUT uploadData **********\n",error)
    res.status(500).json({message: error.message})
  }
  

  
}

module.exports = {uploadData }