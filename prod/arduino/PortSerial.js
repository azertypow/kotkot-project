"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SerialPort = require("serialport");
const Events = require("events");
const socketControl_1 = require("../nodeApp/socketControl");
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
        this.arduino = new Events();
        this.data = new Events();
        this.wasReceivedByArduino = true;
        this.wasTreatedByArduino = true;
        this.anAnimationIsPlaying = false;
        this.dataToSend_standBay = "";
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
                        this.arduino.emit("connected");
                        this.startCommunication();
                        setTimeout(() => {
                            this.sendDirectiveToArduino("intro");
                            console.log("intro envoyé");
                        }, reconnectionDelay);
                    }
                    else if (value === "intro ok") {
                        this.arduino.emit("introyes");
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
            if (this.dataToSend_standBay.length > 0) {
                console.log("!!!!! –––––");
                console.log(this.dataToSend_standBay);
                this.sendDirectiveToArduino(this.dataToSend_standBay);
                console.log("––––– !!!!!");
            }
            if (value === "received") {
                this.wasReceivedByArduino = true;
            }
            if (value === "treated") {
                this.wasTreatedByArduino = true;
            }
            if (value === "animate on") {
                this.anAnimationIsPlaying = true;
            }
            if (value === "animate off") {
                this.anAnimationIsPlaying = false;
            }
            try {
                this.data.emit("JSONReceived", JSON.parse(value));
            }
            catch (e) {
                this.data.emit("otherReceived", value);
            }
        });
        socketControl_1.default.allPlayers.once("connected", () => {
            console.log("PRET POUR COMMENCERRRRRRRRR");
            this.sendDirectiveToArduino("random attente placement");
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
        if (this.wasReceivedByArduino && this.wasTreatedByArduino && !this.anAnimationIsPlaying) {
            this.dataToSend_standBay = "";
            this.wasReceivedByArduino = false;
            this.wasTreatedByArduino = false;
            this.sendData(dataToSend);
            this.sendData(SERIAL_CHARACTER_END);
        }
        else {
            console.log("en attente d'envois");
            this.dataToSend_standBay = dataToSend;
        }
    }
}
exports.default = PortSerial;
