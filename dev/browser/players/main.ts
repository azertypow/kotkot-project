/**
 * Created by azertypow on 06/04/2017.
 */

import SocketClientApp from "./socketClientApp";
import PlayerTemplate from "./playerTemplate";
import removeSleepMode from "../removeSleepMode";

// remove sleep mode
removeSleepMode.run();

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

// lancer le socket
SocketClientApp.run(playerTemplate);
