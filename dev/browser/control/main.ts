/**
 * Created by azertypow on 08/05/2017.
 */

/// <reference types="mustache" />

import socketControlApp from "./socketControlApp"
import ManagePlayers from "./managePlayers"
import LoadJs from "../LoadJs"
import LocationInfo from "../locationInfo"

import child_process = require("child_process");

let selectedPlayers: Array<number> = [];

// ajouter js dinamiqument le file pour la connection socket (à cause de l'adresse ip)
const locationInfo: LocationInfo = new LocationInfo(window.location.href);
const currentHostname = locationInfo.parse.hostname;

LoadJs.load(`http://${currentHostname}:1337/socket.io/socket.io.js`).addEventListener("load", ()=>{
    // initialise socket
    socketControlApp.run(selectedPlayers, currentHostname);

    // manage player
    ManagePlayers.run(selectedPlayers);
});