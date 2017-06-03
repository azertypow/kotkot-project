/**
 * Created by azertypow on 06/04/2017.
 */

import SocketClientApp from "./socketClientApp";
import PlayerTemplate from "./playerTemplate";
import LoadJs from "../LoadJs"
import LocationInfo from "../locationInfo"

// joueur

/// initialiser l'affichage du joueur :
const initParam:InitParam = {
    setIndex: 'en attente…',
    setStatus: 'en attente…',
    setRules: 'attend les propositions que je te proposerais. =)',
    setButtons: [],
    indexElement: <HTMLElement> document.querySelector("#index"),
    statusElement: <HTMLElement> document.querySelector("#status"),
    rulesElement: <HTMLElement> document.querySelector("#rules"),
    buttonsElement: <HTMLElement> document.querySelector(".buttons"),

};
let playerTemplate: PlayerTemplate = new PlayerTemplate(initParam);

// ajouter js dinamiqument le file pour la connection socket (à cause de l'adresse ip)
const locationInfo: LocationInfo = new LocationInfo(window.location.href);
const currentHostname = locationInfo.parse.hostname;

LoadJs.load(`http://${currentHostname}:1337/socket.io/socket.io.js`).addEventListener("load", ()=>{
    // lancer le socket
    SocketClientApp.run(playerTemplate, currentHostname);
});
