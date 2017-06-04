/**
 * Created by azertypow on 06/04/2017.
 */


import SocketClientApp from "./socketClientApp"
import PlayerTemplate from "./playerTemplate"
import LoadJs from "../LoadJs"
import LocationInfo from "../locationInfo"

import * as sequences from "./sequences.js"

// constante
declare let radius: number;

// initialiser l'affichage du joueur :
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


//teste function Mathilde
console.log(radius);

interface MyWindow extends Window{
    playerOneLawSelection: Function,
    playerTwoLawSelection: Function,
    elimination: Function,
    installation: Function,
    brancheCasque: Function,
    hasardSelectionJoueur: Function,
    ecouteDesRegles: Function,
}
declare const window: MyWindow;
window.playerOneLawSelection =  ()=>{sequences.playerOneLawSelection()};
window.playerTwoLawSelection =  ()=>{sequences.playerTwoLawSelection();};
window.elimination           =  ()=>{sequences.elimination();};
window.installation          =  ()=>{sequences.installation();};
window.brancheCasque         =  ()=>{sequences.brancheCasque();};
window.hasardSelectionJoueur =  ()=>{sequences.hasardSelectionJoueur();};
window.ecouteDesRegles       =  ()=>{sequences.ecouteDesRegles();};