"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArduinoConnection_1 = require("./ArduinoConnection");
const arduinoConnection = new ArduinoConnection_1.default();
arduinoConnection.portSerial.arduino.once("connected", () => {
    console.log("EVENT CONNECTION ARDUINO OK");
});
