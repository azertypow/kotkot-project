"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SerialPort = require("serialport");
var Events = require("events");
var SERIAL_CHARACTER_INTI = "I";
var SERIAL_CHARACTER_RESET = "R";
var SERIAL_CHARACTER_BREAK = "B";
var SERIAL_CHARACTER_END = "E";
var threshold = 100;
var maxPotentiometer = 1024;
var minPotentiometer = 0;
var PortSerial = (function () {
    function PortSerial(serialPort, options) {
        var _this = this;
        this.myUsb = new SerialPort(serialPort, options);
        this.data = new Events();
        this.wasReceivedByArduino = true;
        this.wasTreatedByArduino = true;
        this.sendData(SERIAL_CHARACTER_INTI);
        this.myUsb.on("data", function (value) {
            var dataToSend = "bonjours, je suis un arduino qui communique avec nodejs";
            if (value === "received") {
                _this.wasReceivedByArduino = true;
            }
            if (value === "treated") {
                _this.wasTreatedByArduino = true;
            }
            if (_this.wasReceivedByArduino && _this.wasTreatedByArduino) {
                _this.wasReceivedByArduino = false;
                _this.wasTreatedByArduino = false;
                _this.sendData(dataToSend);
                _this.sendData(SERIAL_CHARACTER_END);
            }
            try {
                _this.data.emit("JSONReceived", JSON.parse(value));
            }
            catch (e) {
                _this.data.emit("otherReceived", value);
            }
        });
    }
    PortSerial.prototype.sendData = function (dataToSend) {
        var _this = this;
        this.myUsb.write(new Buffer(dataToSend, 'ascii'), function (err) {
            if (err) {
                console.log("r'envois d'initialisation");
                setTimeout(function () {
                    _this.sendData(SERIAL_CHARACTER_RESET);
                }, 3000);
                return console.log('Error on write: ', err.message);
            }
            console.log('message envoyé :' + dataToSend);
        });
    };
    return PortSerial;
}());
exports.default = PortSerial;
