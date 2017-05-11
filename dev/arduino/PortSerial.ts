/**
 * Created by azertypow on 11/05/2017.
 */

/// <reference types="serialport" />

import SerialPort = require("serialport");
import Events = require("events");
const threshold : number = 100;

export default class PortSerial {

    myUsb: SerialPort;
    data: Events;
    private valueStocked: number = 0;

    constructor (serialPort: string, options: SerialPort.options){
        this.myUsb = new SerialPort(serialPort, options);
        this.data = new Events();
        this.myUsb.on("data", (value: string)=>{

            let value_toString = parseInt(value);

            if( value_toString < (this.valueStocked - threshold) || value_toString > ( this.valueStocked + threshold) ){
                this.data.emit("received", value);
                this.valueStocked = value_toString;
                console.log("OK");
            }
        });
    }
}