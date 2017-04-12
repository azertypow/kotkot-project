/**
 * Created by azertypow on 06/04/2017.
 */

import SocketClientApp from "./socketClientApp";
import PlayerTemplate from "./playerTemplate";

SocketClientApp.run();

// joueur

/// initialiser l'affichage du joueur :
let playerTemplate: PlayerTemplate = new PlayerTemplate('1', 'pusher', 'attend ton tour pour jouer');

/// selectionner les ellements d'affichage
let playerElementIndex: HTMLElement = <HTMLElement> document.querySelector("#index");
let playerElementStatus: HTMLElement = <HTMLElement> document.querySelector("#status");
let playerElementRules: HTMLElement = <HTMLElement> document.querySelector("#rules");
playerTemplate.setElements(playerElementIndex, playerElementStatus, playerElementRules);

/// initialiser les valeurs

//// enregistrer le template (pour toutes les mise a jours)
playerTemplate.initValues();

//// mise a jour template a l'initialisation de la page

let patern: Object = {
    index: 1,
    status: "pusher",
    rules: "attend les ordre que l'on va te dicter petite merde d'humain"
};

playerTemplate.setValues(patern);