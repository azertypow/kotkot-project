"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SerialPort = require("serialport");
const PortSerial_1 = require("./PortSerial");
const ReadLine = require("readline");
class ArduinoConnection {
    constructor() {
        this.portSerial = new PortSerial_1.default("/dev/cu.usbmodem1411", {
            baudRate: 115200,
            parser: SerialPort.parsers.readline("\r\n"),
        });
        let arduinoData = {
            other: "",
            potentiometer: JSON.parse("{}"),
        };
        this.portSerial.data.on("JSONReceived", (json) => {
            arduinoData.potentiometer = json;
        });
        this.portSerial.data.on("otherReceived", (data) => {
            arduinoData.other = data;
            console.log(arduinoData.other);
        });
        class Screen {
            static print() {
                ReadLine.cursorTo(process.stdout, 0, 0);
                ReadLine.clearScreenDown(process.stdout);
                console.log("other:");
                console.log(this.data.arduinoOther);
                console.log("potentiometer");
                console.log(this.data.arduinoPotentiometer);
            }
        }
        Screen.data = {
            arduinoOther: "",
            arduinoPotentiometer: JSON.parse("{}"),
        };
    }
}
exports.default = ArduinoConnection;
