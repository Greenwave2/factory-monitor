let app

describe('The fist hello world test', () => {
  
  const aedes = require("./utils/aedes.js");
  
  const request = require('supertest');
  
  const mqtt = require('mqtt');
    
    beforeAll(async () => {
        // Initialize myData before all test in this describe
        await aedes.runMqttServer()
        app = require('../src/app.js');
        
    });
        
    afterAll(() => {
    // Teardown code after all test in this describe
    });
    
    beforeEach(() => {
    // Initialize myData before each test
    });
    
    afterEach(() => {
    // Teardown code after each test
    });
    
    
    describe('PUT /data', () => {

        test('responds with JSON with 200', async () => {

          var opt = {
              port: process.env.MQTT_SOCKET_PORT,
          };
          
          var mqttClient = mqtt.connect('ws://127.0.0.1', opt);
          
          const reqPayload = {"result": [{"Label": "DPT-205", "Value": "0 mmH2O"}, {"Label": "TI-250A", "Value": "115.9 degC"}, {"Label": "TI-250B", "Value": "162.7 degC"}, {"Label": "TI-250C", "Value": "164.8 degC"}, {"Label": "CV-203", "Value": "49.0 %"}, {"Label": "FIT218", "Value": "24.5 m3/h"}, {"Label": "FQA", "Value": "5189.5 m3"}, {"Label": "Total Flow", "Value": "358440.0 m3"}, {"Label": "CV-289", "Value": "0.0 %"}, {"Label": "FIT-202", "Value": "81.0 Nm3/h"}, {"Label": "PI-250", "Value": "5.16 kg/cm2"}, {"Label": "FIC-250#1", "Value": "19.6 %"}, {"Label": "FIC-250#2", "Value": "1.36 m3/h"}, {"Label": "LT-202A", "Value": "2463 mm"}, {"Label": "PI-203", "Value": "5.20 kg/cm2"}, {"Label": "LI-202", "Value": "1619 mm"}, {"Label": "TI-204", "Value": "183.7 degC"}, {"Label": "LI-207", "Value": "29.8 cm"}, {"Label": "FIC-265#1", "Value": "17.5 %"}, {"Label": "FIC-265#2", "Value": "255.9 kg/h"}, {"Label": "FIC-259#1", "Value": "94 %"}, {"Label": "FIC-259#2", "Value": "0.99 m3/h"}, {"Label": "TT-201", "Value": "199.9 degC"}, {"Label": "TT-203D", "Value": "22.9 degC"}, {"Label": "CV-201", "Value": "100.0 %"}, {"Label": "TT-206", "Value": "313 degC"}, {"Label": "LI-203", "Value": "0.0 %"}, {"Label": "TI-260A", "Value": "92.3 degC"}, {"Label": "TI-260B", "Value": "130.6 degC"}, {"Label": "TI-260C", "Value": "138.5 degC"}, {"Label": "TI-260D", "Value": "1384 degC"}, {"Label": "PI-260A", "Value": "0.06 kg/cm2"}, {"Label": "LCV-284", "Value": "0.0 %"}, {"Label": "FI-263B", "Value": "0.09 m3/h"}, {"Label": "PI-260B", "Value": "0.16 kg/cm2"}, {"Label": "LI-260", "Value": "45.5 %"}, {"Label": "LIC-260", "Value": "164 %"}, {"Label": "LI-262", "Value": "236 %"}]};


          let response;
          const mqttTest = () => {
            
            return new Promise((resolve, reject) => {
              mqttClient.on("connect", ()=>{
            
                console.log("test connect to mqtt on port", opt.port)
                
                mqttClient.subscribe("/factory",async () => {
                  console.log("sucscribe")
                  
                  mqttClient.on("message", (topic, payload, packet) => {
                    console.log(payload.toString())
                    expect(topic).toEqual("/factory");
                    expect(payload.toString()).toEqual(JSON.stringify(reqPayload.result))
                    resolve("pass")

                  })
                  response = await request(app).put('/data').send(reqPayload);

                })
              })
            })
          }

          await mqttTest()
           
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual({message:"success"})

          


           
        });

    })
 
});
  