/**
 * Created by azertypow on 11/05/2017.
 */

/// <reference types="serialport" />

import SerialPort = require("serialport");
import Events = require("events");
import WritableStream = NodeJS.WritableStream;
import {removeAllListeners} from "cluster";

const SERIAL_CHARACTER_INTI: string = "I";
const SERIAL_CHARACTER_RESET: string = "R";
const SERIAL_CHARACTER_BREAK: string = "B";
const SERIAL_CHARACTER_END: string = "E";

const reconnectionDelay = 3000;

const threshold: number = 100;
const maxPotentiometer: number = 1024;
const minPotentiometer: number = 0;

interface SerialPortEvent extends SerialPort{
    eventNames(): (string | symbol)[];
    listeners(event: string | symbol): Function[];
    removeAllListeners(event?: string): void;
    removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

export default class PortSerial {

    myUsb: SerialPort;
    public arduino: Events;
    data: Events;
    private wasReceivedByArduino: boolean;
    private wasTreatedByArduino: boolean;

    constructor (serialPort: string, options: SerialPort.options){
        this.myUsb = new SerialPort(serialPort, options);
        this.arduino = new Events();
        this.data = new Events();
        this.wasReceivedByArduino = true;
        this.wasTreatedByArduino = true;

        // initialiser la connection avec l'arduino
        this.initCommunication();
    }

    initCommunication(){
        this.myUsb.write(new Buffer(SERIAL_CHARACTER_INTI, 'ascii'), (err)=>{
            if(err){
                console.log("init echoué");
                console.log(`tantative de nouvelle connection dans ${reconnectionDelay}`);
                setTimeout(()=>{
                    this.initCommunication();
                }, reconnectionDelay);
            }
            else {
                this.myUsb.on("data", (value: string)=>{

                    // confirmer la reception de connection
                    if(value === "connected"){
                        // connection ok!
                        // supprimer le listener
                        console.log("––––––––––");
                        console.log( (<SerialPortEvent>this.myUsb).eventNames() );
                        console.log( (<SerialPortEvent>this.myUsb).listeners("data") );

                        console.log("supression du listener");
                        (<SerialPortEvent>this.myUsb).removeAllListeners();

                        console.log( (<SerialPortEvent>this.myUsb).eventNames() );
                        console.log( (<SerialPortEvent>this.myUsb).listeners("data") );
                        console.log("––––––––––");

                        console.log("ARDUINO CONNECTED");

                        this.arduino.emit("connected");

                        // commencer la communication
                        this.startCommunication();

                        // message de teste
                        setTimeout(()=>{
                            this.sendDirectiveToArduino("check");
                            console.log("check envoyé");
                        }, reconnectionDelay)
                    }
                    else{
                        // retour de l'arduino inconnu
                        console.log("retour de l'arduino incorrect");
                        console.log(`tentative de nouvelle connection dans ${reconnectionDelay}`);
                        setTimeout(()=>{
                            this.initCommunication();
                        }, reconnectionDelay);
                    }

                    console.log(value);
                });
            }
        });
    }

    startCommunication(){

        // à la reception de valeur de la part de l'arduino
        this.myUsb.on("data", (value: string)=>{

            // notifier que l'arduino a bien recu les données
            if(value === "received"){
                this.wasReceivedByArduino = true;
            }

            // notifier que les données ont bien été traité
            if(value === "treated"){
                this.wasTreatedByArduino = true;
            }

            //––––––––––
            //––––––––––obselete ?
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
            //––––––––––
            //––––––––––
        });
    }

    sendData(dataToSend: string){
        this.myUsb.write(new Buffer(dataToSend, 'ascii'), (err)=>{
            if(err){
                console.log("r'envois du message");
                setTimeout(()=>{
                    this.sendData(SERIAL_CHARACTER_RESET);
                }, reconnectionDelay);

                return console.log('Error on write: ', err.message);
            }
            // process.stdout.write("message write");
            console.log('message envoyé :'+dataToSend);
        });
    }

    sendDirectiveToArduino(dataToSend: string){
        // si données deja recu, on peut envoyer les suivantes
        if(this.wasReceivedByArduino && this.wasTreatedByArduino){

            // notifier que des data sont envoyé à l'arduino (attente de reception et attente de traitement)
            this.wasReceivedByArduino = false;
            this.wasTreatedByArduino = false;

            // envois un par un
            // for(let i: number = 0; i < dataToSend.length; i++){
            //     this.sendData(dataToSend[i]);
            // }

            // envoyer les donnée
            this.sendData(dataToSend);

            // caractere signalent la fin des donnés
            this.sendData(SERIAL_CHARACTER_END);
        }
        // sinon, stocker les message en attendant la liberation
        else{
            // !!! a faire tableau -> evenement arduino ready -> si tableau.length > 0, envoyer la [premiere ? derniere ? toute ? juste la dernière] directive
        }
    }
}
