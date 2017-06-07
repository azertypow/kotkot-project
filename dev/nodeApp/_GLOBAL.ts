/**
 * Created by azertypow on 28/05/2017.
 */

import ArduinoConnection from "../arduino/ArduinoConnection"

export default class _GLOBAL {
    static debug: boolean = true;
    static numberOfPlayers: number = 8;
    static ARDUINO: ArduinoConnection;
}