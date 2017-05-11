"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SerialPort = require("serialport");
var Events = require("events");
var threshold = 100;
var PortSerial = (function () {
    function PortSerial(serialPort, options) {
        var _this = this;
        this.valueStocked = 0;
        this.myUsb = new SerialPort(serialPort, options);
        this.data = new Events();
        this.myUsb.on("data", function (value) {
            var value_toString = parseInt(value);
            if (value_toString < (_this.valueStocked - threshold) || value_toString > (_this.valueStocked + threshold)) {
                _this.data.emit("received", value);
                _this.valueStocked = value_toString;
                console.log("OK");
            }
        });
    }
    return PortSerial;
}());
exports.default = PortSerial;
