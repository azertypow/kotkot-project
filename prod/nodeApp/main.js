"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const voiceGenerator_1 = require("./voiceGenerator");
const appServer_1 = require("./appServer");
const ArduinoConnection_1 = require("../arduino/ArduinoConnection");
const _GLOBAL_1 = require("./_GLOBAL");
voiceGenerator_1.default.say_waitDeArduino();
const arduinoConnection = new ArduinoConnection_1.default();
_GLOBAL_1.default.ARDUINO = arduinoConnection;
arduinoConnection.portSerial.arduino.once("connected", () => {
    console.log("EVENT CONNECTION ARDUINO OK");
    voiceGenerator_1.default.say_waitConnectionPlayers();
    appServer_1.default.run("1337");
});
arduinoConnection.portSerial.arduino.once("introyes", () => {
    console.log("yeees");
});
