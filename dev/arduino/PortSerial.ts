/**
 * Created by azertypow on 11/05/2017.
 */

/// <reference types="serialport" />

import SerialPort = require("serialport");
import Events = require("events");
import WritableStream = NodeJS.WritableStream;
import {removeAllListeners} from "cluster";
import Timer = NodeJS.Timer;
import SocketControl from "../nodeApp/socketControl"

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
    private anAnimationIsPlaying: boolean;
    private dataToSend_standBay: string;

    constructor (serialPort: string, options: SerialPort.options){
        this.myUsb = new SerialPort(serialPort, options);
        this.arduino = new Events();
        this.data = new Events();
        this.wasReceivedByArduino = true;
        this.wasTreatedByArduino = true;
        this.anAnimationIsPlaying = false;
        this.dataToSend_standBay = "";

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
                            this.sendDirectiveToArduino("intro");
                            console.log("intro envoyé");
                        }, reconnectionDelay)
                    }
                    else if (value === "intro ok"){
                        this.arduino.emit("introyes");
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

            // regarder si des donners sont en attente d'envois
            if(this.dataToSend_standBay.length > 0){
                console.log("!!!!! –––––");
                console.log(this.dataToSend_standBay);
                this.sendDirectiveToArduino(this.dataToSend_standBay);
                console.log("––––– !!!!!");
            }

            // notifier que l'arduino a bien recu les données
            if(value === "received"){
                this.wasReceivedByArduino = true;
            }

            // notifier que les données ont bien été traité
            if(value === "treated"){
                this.wasTreatedByArduino = true;
            }

            if(value === "animate on"){
                this.anAnimationIsPlaying = true;
            }

            if(value === "animate off"){
                this.anAnimationIsPlaying = false;
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

        // attente de connection de tous les joueurs
        SocketControl.allPlayers.once("connected", ()=>{
            console.log("PRET POUR COMMENCERRRRRRRRR");

            // envoyer random en attente de positionnment des joueurs
            this.sendDirectiveToArduino("random attente placement");
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

    // loop si info pas réussi a envoyé et que ce n'est pas du a une annimation
    // sendDataStandBay_interval: Timer;
    //
    // sendDataStandBay(){
    //     this.sendDataStandBay_interval = setInterval(()=>{},);
    // }

    sendDirectiveToArduino(dataToSend: string){
        // si données deja recu, on peut envoyer les suivantes
        if(this.wasReceivedByArduino && this.wasTreatedByArduino && !this.anAnimationIsPlaying){

            this.dataToSend_standBay = "";

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
        // data n'ont pas pu etre envoyé car arduino traite des information sur les leds
        else{
            // si c'est du a une annimation
            //if(this.anAnimationIsPlaying){
                console.log("en attente d'envois");
                this.dataToSend_standBay = dataToSend;
            //}
            // autre ??
            //else {
                // !!! a faire tableau -> evenement arduino ready -> si tableau.length > 0, envoyer la [premiere ? derniere ? toute ? juste la dernière] directive
            //}
        }
    }
}
