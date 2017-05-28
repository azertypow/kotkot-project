/**
 * Created by azertypow on 11/05/2017.
 */

import ArduinoConnection from "./ArduinoConnection"

const arduinoConnection: ArduinoConnection = new ArduinoConnection();
arduinoConnection.portSerial.arduino.once("connected", ()=>{
    console.log("EVENT CONNECTION ARDUINO OK");
});
