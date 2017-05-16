"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SerialPort = require("serialport");
var Events = require("events");
var threshold = 100;
var maxPotentiometer = 1024;
var minPotentiometer = 0;
var PortSerial = (function () {
    function PortSerial(serialPort, options) {
        var _this = this;
        this.valueStocked = 0;
        this.myUsb = new SerialPort(serialPort, options);
        this.data = new Events();
        this.isReceivedFromArduino = true;
        this.sendData("\n");
        this.myUsb.on("data", function (value) {
            var dataToSend = "bonjours";
            if (value === "recu") {
                _this.isReceivedFromArduino = true;
            }
            if (_this.isReceivedFromArduino) {
                _this.isReceivedFromArduino = false;
                _this.sendData(dataToSend + "\n");
            }
            console.log(value);
            var valueParsed = "null";
            try {
                valueParsed = JSON.parse(value);
            }
            catch (e) {
                valueParsed = e;
            }
            console.log(valueParsed);
        });
    }
    PortSerial.prototype.sendData = function (dataToSend) {
        var _this = this;
        this.myUsb.write(new Buffer(dataToSend, 'ascii'), function (err) {
            if (err) {
                console.log("r'envois d'initialisation");
                setTimeout(function () {
                    _this.sendData("\n");
                }, 3000);
                return console.log('Error on write: ', err.message);
            }
            console.log('message envoyé');
        });
    };
    return PortSerial;
}());
exports.default = PortSerial;
