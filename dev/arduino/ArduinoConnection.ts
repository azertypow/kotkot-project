/**
 * Created by azertypow on 11/05/2017.
 */

import SerialPort = require("serialport")
import PortSerial from "./PortSerial"
import ReadLine = require("readline")

export default class ArduinoConnection{

    public portSerial: PortSerial;

    constructor(){
        this.portSerial = new PortSerial("/dev/cu.usbmodem1411", {
            baudRate: 115200, // 9600, 19200, 115200
            parser: SerialPort.parsers.readline("\r\n"),
        });

        interface ArduinoData{
            potentiometer: JSON,
            other: string,
        }

        let arduinoData: ArduinoData = {
            other: "",
            potentiometer: JSON.parse("{}"),
        };

        this.portSerial.data.on("JSONReceived", (json: JSON)=>{
            arduinoData.potentiometer = json;

            // console.log(arduinoData.potentiometer);

            // print in console
            // Screen.data.arduinoPotentiometer = arduinoData.potentiometer;
            // Screen.print();
        });

        this.portSerial.data.on("otherReceived", (data: string)=>{
            arduinoData.other = data;

            console.log(arduinoData.other);

            // print in console
            // Screen.data.arduinoOther = arduinoData.other;
            // Screen.print();
        });

        // afficher les donners
        interface ScreenData {
            arduinoOther: string,
            arduinoPotentiometer: JSON,
        }
        class Screen{
            public static data: ScreenData = {
                arduinoOther: "",
                arduinoPotentiometer: JSON.parse("{}"),
            };

            public static print (){
                ReadLine.cursorTo(process.stdout, 0, 0);
                ReadLine.clearScreenDown(process.stdout);

                console.log("other:");
                console.log(this.data.arduinoOther);
                console.log("potentiometer");
                console.log(this.data.arduinoPotentiometer);
            }
        }
    }
}