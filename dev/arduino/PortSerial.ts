/**
 * Created by azertypow on 11/05/2017.
 */

/// <reference types="serialport" />

import SerialPort = require("serialport");
import Events = require("events");
import ReadLine = require("readline");

const threshold: number = 100;
const maxPotentiometer: number = 1024;
const minPotentiometer: number = 0;

export default class PortSerial {

    myUsb: SerialPort;
    data: Events;
    private valueStocked: number = 0;
    private isReceivedFromArduino: boolean;

    constructor (serialPort: string, options: SerialPort.options){
        this.myUsb = new SerialPort(serialPort, options);
        this.data = new Events();
        this.isReceivedFromArduino = true;

        // initialiser la connection avec l'arduino
        this.sendData("\n");

        this.myUsb.on("data", (value: string)=>{

            //afficher dans le terminal les info en cours sur les potentiomettres
            // ReadLine.clearLine(process.stdout, 0);
            // ReadLine.cursorTo(process.stdout, 0, null);
            // process.stdout.write(value);

            // envois a arduino
            let dataToSend: string = "bonjours";

            // verifier si l'arduino a bien recu les données
            if(value === "recu"){
                this.isReceivedFromArduino = true;
            }

            // si données deja recu, on peut envoyer les suivantes
            if(this.isReceivedFromArduino){
                this.isReceivedFromArduino = false;
                this.sendData(dataToSend+"\n");
            }

            // convertir les données recu en object :
            console.log(value);
            let valueParsed: string = "null";
            try{
                valueParsed = JSON.parse(value);
            }
            catch(e){
                valueParsed = e;
            }
            console.log( valueParsed );

            // let value_toInt = parseInt(value);
            //
            // if( value_toInt < (this.valueStocked - threshold) || value_toInt > ( this.valueStocked + threshold) ){
            //     this.data.emit("received", value);
            //     this.valueStocked = value_toInt;
            //     console.log("OK");
            // }
        });
    }

    sendData(dataToSend: string){
        this.myUsb.write(new Buffer(dataToSend, 'ascii'), (err)=>{
            if(err){
                console.log("r'envois d'initialisation");
                setTimeout(()=>{
                    this.sendData("\n");
                }, 3000);

                return console.log('Error on write: ', err.message);
            }
            // process.stdout.write("message write");
            console.log('message envoyé');
        });
    }
}