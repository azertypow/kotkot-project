"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SerialPort = require("serialport");
const Events = require("events");
const SERIAL_CHARACTER_INTI = "I";
const SERIAL_CHARACTER_RESET = "R";
const SERIAL_CHARACTER_BREAK = "B";
const SERIAL_CHARACTER_END = "E";
const reconnectionDelay = 3000;
const threshold = 100;
const maxPotentiometer = 1024;
const minPotentiometer = 0;
class PortSerial {
    constructor(serialPort, options) {
        this.myUsb = new SerialPort(serialPort, options);
        this.data = new Events();
        this.wasReceivedByArduino = true;
        this.wasTreatedByArduino = true;
        this.initCommunication();
    }
    initCommunication() {
        this.myUsb.write(new Buffer(SERIAL_CHARACTER_INTI, 'ascii'), (err) => {
            if (err) {
                console.log("init echoué");
                console.log(`tantative de nouvelle connection dans ${reconnectionDelay}`);
                setTimeout(() => {
                    this.initCommunication();
                }, reconnectionDelay);
            }
            else {
                this.myUsb.on("data", (value) => {
                    if (value === "connected") {
                        console.log("––––––––––");
                        console.log(this.myUsb.eventNames());
                        console.log(this.myUsb.listeners("data"));
                        console.log("supression du listener");
                        this.myUsb.removeAllListeners();
                        console.log(this.myUsb.eventNames());
                        console.log(this.myUsb.listeners("data"));
                        console.log("––––––––––");
                        console.log("ARDUINO CONNECTED");
                        this.startCommunication();
                        setTimeout(() => {
                            this.sendDirectiveToArduino("hello kotkot");
                            console.log("hello kotkot envoyé");
                        }, reconnectionDelay);
                    }
                    else {
                        console.log("retour de l'arduino incorrect");
                        console.log(`tentative de nouvelle connection dans ${reconnectionDelay}`);
                        setTimeout(() => {
                            this.initCommunication();
                        }, reconnectionDelay);
                    }
                    console.log(value);
                });
            }
        });
    }
    startCommunication() {
        this.myUsb.on("data", (value) => {
            if (value === "received") {
                this.wasReceivedByArduino = true;
            }
            if (value === "treated") {
                this.wasTreatedByArduino = true;
            }
            try {
                this.data.emit("JSONReceived", JSON.parse(value));
            }
            catch (e) {
                this.data.emit("otherReceived", value);
            }
        });
    }
    sendData(dataToSend) {
        this.myUsb.write(new Buffer(dataToSend, 'ascii'), (err) => {
            if (err) {
                console.log("r'envois du message");
                setTimeout(() => {
                    this.sendData(SERIAL_CHARACTER_RESET);
                }, reconnectionDelay);
                return console.log('Error on write: ', err.message);
            }
            console.log('message envoyé :' + dataToSend);
        });
    }
    sendDirectiveToArduino(dataToSend) {
        if (this.wasReceivedByArduino && this.wasTreatedByArduino) {
            this.wasReceivedByArduino = false;
            this.wasTreatedByArduino = false;
            this.sendData(dataToSend);
            this.sendData(SERIAL_CHARACTER_END);
        }
        else {
        }
    }
}
exports.default = PortSerial;
