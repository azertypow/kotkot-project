/**
 * Created by azertypow on 11/05/2017.
 */

/// <reference types="serialport" />

import SerialPort = require("serialport");
import Events = require("events");
import WritableStream = NodeJS.WritableStream;

const SERIAL_CHARACTER_INTI: string = "I";
const SERIAL_CHARACTER_RESET: string = "R";
const SERIAL_CHARACTER_BREAK: string = "B";
const SERIAL_CHARACTER_END: string = "E";

const threshold: number = 100;
const maxPotentiometer: number = 1024;
const minPotentiometer: number = 0;

export default class PortSerial {

    myUsb: SerialPort;
    data: Events;
    private wasReceivedByArduino: boolean;
    private wasTreatedByArduino: boolean;

    constructor (serialPort: string, options: SerialPort.options){
        this.myUsb = new SerialPort(serialPort, options);
        this.data = new Events();
        this.wasReceivedByArduino = true;
        this.wasTreatedByArduino = true;

        // initialiser la connection avec l'arduino
        this.sendData(SERIAL_CHARACTER_INTI);

        this.myUsb.on("data", (value: string)=>{

            // envois a arduino
            let dataToSend: string = "bonjours, je suis un arduino qui communique avec nodejs";

            // verifier si l'arduino a bien recu les données
            if(value === "received"){
                this.wasReceivedByArduino = true;
            }

            if(value === "treated"){
                this.wasTreatedByArduino = true;
            }

            // si données deja recu, on peut envoyer les suivantes
            if(this.wasReceivedByArduino && this.wasTreatedByArduino){
                this.wasReceivedByArduino = false;
                this.wasTreatedByArduino = false;
                // for(let i: number = 0; i < dataToSend.length; i++){
                //     this.sendData(dataToSend[i]);
                // }

                this.sendData(dataToSend);
                this.sendData(SERIAL_CHARACTER_END);
            }

            // convertir les données recu en object :
            interface ValueParsed {
                data: JSON,
                isJson: boolean,
            }

            try{
                // emit JSON received data event and send json
                this.data.emit("JSONReceived", JSON.parse(value));
            }
            catch(e){
                this.data.emit("otherReceived", value);
            }
        });
    }

    sendData(dataToSend: string){
        this.myUsb.write(new Buffer(dataToSend, 'ascii'), (err)=>{
            if(err){
                console.log("r'envois d'initialisation");
                setTimeout(()=>{
                    this.sendData(SERIAL_CHARACTER_RESET);
                }, 3000);

                return console.log('Error on write: ', err.message);
            }
            // process.stdout.write("message write");
            console.log('message envoyé :'+dataToSend);
        });
    }
}