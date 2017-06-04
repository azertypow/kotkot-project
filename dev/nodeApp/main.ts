/**
 * Created by azertypow on 09/04/2017.
 */

import VoiceGenerator from "./voiceGenerator"
import AppServer from "./appServer"
import ArduinoConnection from "../arduino/ArduinoConnection"

// voie attente connection arduino
VoiceGenerator.say_waitDeArduino();

// lancer la connection a arduino
const arduinoConnection: ArduinoConnection = new ArduinoConnection();
arduinoConnection.portSerial.arduino.once("connected", ()=>{
    console.log("EVENT CONNECTION ARDUINO OK");

    // voie attente connection de tous les joueurs
    VoiceGenerator.say_waitConnectionPlayers();

    // lancer le serveur et la connection des joueur socket
    AppServer.run("1337");
});