/**
 * Created by azertypow on 11/05/2017.
 */

/// <reference types="serialport" />

import SerialPort = require("serialport");
import Events = require("events");
import ReadLine = require("readline");
import WritableStream = NodeJS.WritableStream;

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
            interface ValueParsed {
                data: JSON,
                isJson: boolean,
            }

            let valueParsed: ValueParsed = {
                data: JSON.parse("{}"),
                isJson: false,
            };

            try{
                valueParsed.data = JSON.parse(value);
                valueParsed.isJson = true;
            }
            catch(e){
                // console.log("data from arduino isn't JSON format");
                // console.log(e);
            }

            //afficher dans le terminal les info en cours sur les potentiomettres
            if(valueParsed.isJson){
                ReadLine.cursorTo(process.stdout, 0, 0);
                ReadLine.clearScreenDown(process.stdout);
                console.log( valueParsed.data );
            }


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