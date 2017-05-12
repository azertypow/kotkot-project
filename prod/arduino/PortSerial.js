"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SerialPort = require("serialport");
var Events = require("events");
var ReadLine = require("readline");
var threshold = 100;
var maxPotentiometer = 1024;
var minPotentiometer = 0;
var PortSerial = (function () {
    function PortSerial(serialPort, options) {
        this.valueStocked = 0;
        this.myUsb = new SerialPort(serialPort, options);
        this.data = new Events();
        this.myUsb.on("data", function (value) {
            ReadLine.clearLine(process.stdout, 0);
            ReadLine.cursorTo(process.stdout, 0, null);
            process.stdout.write(value);
        });
    }
    return PortSerial;
}());
exports.default = PortSerial;
