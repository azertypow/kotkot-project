/**
 * Created by azertypow on 11/05/2017.
 */

import SerialPort = require("serialport");
import PortSerial from "./PortSerial"


const portSerial: PortSerial = new PortSerial("/dev/cu.usbmodem1411", {
    baudRate: 250000,
    parser: SerialPort.parsers.readline("\r\n"),
});

portSerial.data.on("received", (value: number)=>{
    console.log(value);
});