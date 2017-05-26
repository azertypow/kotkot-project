"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SerialPort = require("serialport");
var PortSerial_1 = require("./PortSerial");
var ReadLine = require("readline");
var portSerial = new PortSerial_1.default("/dev/cu.usbmodem1411", {
    baudRate: 115200,
    parser: SerialPort.parsers.readline("\r\n"),
});
var arduinoData = {
    other: "",
    potentiometer: JSON.parse("{}"),
};
portSerial.data.on("JSONReceived", function (json) {
    arduinoData.potentiometer = json;
});
portSerial.data.on("otherReceived", function (data) {
    arduinoData.other = data;
    console.log(arduinoData.other);
});
var Screen = (function () {
    function Screen() {
    }
    Screen.print = function () {
        ReadLine.cursorTo(process.stdout, 0, 0);
        ReadLine.clearScreenDown(process.stdout);
        console.log("other:");
        console.log(this.data.arduinoOther);
        console.log("potentiometer");
        console.log(this.data.arduinoPotentiometer);
    };
    return Screen;
}());
Screen.data = {
    arduinoOther: "",
    arduinoPotentiometer: JSON.parse("{}"),
};
