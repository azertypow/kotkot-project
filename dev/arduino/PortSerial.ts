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

    constructor (serialPort: string, options: SerialPort.options){
        this.myUsb = new SerialPort(serialPort, options);
        this.data = new Events();

        this.myUsb.on("data", (value: string)=>{

            ReadLine.clearLine(process.stdout, 0);
            ReadLine.cursorTo(process.stdout, 0, null);
            process.stdout.write(value);

            // let value_toInt = parseInt(value);
            //
            // if( value_toInt < (this.valueStocked - threshold) || value_toInt > ( this.valueStocked + threshold) ){
            //     this.data.emit("received", value);
            //     this.valueStocked = value_toInt;
            //     console.log("OK");
            // }
        });
    }
}