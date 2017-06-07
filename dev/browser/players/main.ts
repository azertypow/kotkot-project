/**
 * Created by azertypow on 06/04/2017.
 */

import SocketClientApp from "./socketClientApp"
import LoadJs from "../LoadJs"
import LocationInfo from "../locationInfo"

import * as sequences from "./sequences.js"

// global
declare let radius: number;

// ajouter js dinamiqument le file pour la connection socket (à cause de l'adresse ip)
const locationInfo: LocationInfo = new LocationInfo(window.location.href);
const currentHostname = "172.20.12.201";

// LoadJs.load(`http://${currentHostname}:1337/socket.io/socket.io.js`).addEventListener("load", ()=>{
//     // lancer le socket
//     SocketClientApp.run(currentHostname);
// });

SocketClientApp.run(currentHostname);

//teste function Mathilde
console.log(radius);

interface MyWindow extends Window{
    playerOneLawSelection: Function,
    playerTwoLawSelection: Function,
    elimination: Function,
    installation: Function,
    brancheCasque: Function,
    ecouteDesRegles: Function,
    eliminateSomeone: Function,
}
declare const window: MyWindow;
window.playerOneLawSelection =  ()=>{sequences.playerOneLawSelection()};
window.playerTwoLawSelection =  ()=>{sequences.playerTwoLawSelection();};
window.elimination           =  ()=>{sequences.elimination();};
window.installation          =  ()=>{sequences.installation();};
window.brancheCasque         =  ()=>{sequences.brancheCasque();};
window.ecouteDesRegles       =  ()=>{sequences.ecouteDesRegles();};
window.eliminateSomeone      =  ()=>{sequences.eliminateSomeone()};