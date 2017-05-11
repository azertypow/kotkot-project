"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SerialPort = require("serialport");
var PortSerial_1 = require("./PortSerial");
var portSerial = new PortSerial_1.default("/dev/cu.usbmodem1411", {
    baudRate: 250000,
    parser: SerialPort.parsers.readline("\r\n"),
});
portSerial.data.on("received", function (value) {
    console.log(value);
});
