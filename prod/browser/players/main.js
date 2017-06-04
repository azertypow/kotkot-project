/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LoadJs = (function () {
    function LoadJs() {
    }
    LoadJs.load = function (file) {
        var jsElement = document.createElement("script");
        jsElement.type = "text/javascript";
        jsElement.src = file;
        document.body.appendChild(jsElement);
        return jsElement;
    };
    return LoadJs;
}());
exports.default = LoadJs;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LocationInfo = (function () {
    function LocationInfo(urlToParse) {
        this.parse = document.createElement("a");
        this.parse.href = urlToParse;
    }
    return LocationInfo;
}());
exports.default = LocationInfo;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["playerTwoLawSelection"] = playerTwoLawSelection;
/* harmony export (immutable) */ __webpack_exports__["playerOneLawSelection"] = playerOneLawSelection;
/* harmony export (immutable) */ __webpack_exports__["elimination"] = elimination;
/* harmony export (immutable) */ __webpack_exports__["brancheCasque"] = brancheCasque;
/* harmony export (immutable) */ __webpack_exports__["installation"] = installation;
/* harmony export (immutable) */ __webpack_exports__["ecouteDesRegles"] = ecouteDesRegles;
/* harmony export (immutable) */ __webpack_exports__["displayElimination"] = displayElimination;
/* harmony export (immutable) */ __webpack_exports__["eliminateSomeone"] = eliminateSomeone;
/* harmony export (immutable) */ __webpack_exports__["displayEliminatedPlayer"] = displayEliminatedPlayer;
/* harmony export (immutable) */ __webpack_exports__["giveYourVoteToSomeone"] = giveYourVoteToSomeone;
/* harmony export (immutable) */ __webpack_exports__["placeCursorBeginning"] = placeCursorBeginning;
/* harmony export (immutable) */ __webpack_exports__["moveCursor"] = moveCursor;
/* harmony export (immutable) */ __webpack_exports__["hasardSelectionJoueur"] = hasardSelectionJoueur;
/* harmony export (immutable) */ __webpack_exports__["map"] = map;
/* harmony export (immutable) */ __webpack_exports__["background"] = background;
/* harmony export (immutable) */ __webpack_exports__["createLaws"] = createLaws;
/* harmony export (immutable) */ __webpack_exports__["setLaws"] = setLaws;
/* harmony export (immutable) */ __webpack_exports__["selectOneLaw"] = selectOneLaw;
/* harmony export (immutable) */ __webpack_exports__["generateLaw"] = generateLaw;
/* harmony export (immutable) */ __webpack_exports__["selectTwoLaws"] = selectTwoLaws;
/* harmony export (immutable) */ __webpack_exports__["sendChoicesToPlayerTwo"] = sendChoicesToPlayerTwo;
/* harmony export (immutable) */ __webpack_exports__["displayButton"] = displayButton;
/* harmony export (immutable) */ __webpack_exports__["removeButtons"] = removeButtons;
/* harmony export (immutable) */ __webpack_exports__["displayMessage"] = displayMessage;
/* harmony export (immutable) */ __webpack_exports__["displayWarning"] = displayWarning;
/* harmony export (immutable) */ __webpack_exports__["removeWarning"] = removeWarning;
/**
 * Created by mathi on 03/06/2017.
 */

// declare global variables

// Ce sont les morceaux de code qui sont appelés pendant le déroulement du jeu qui se passe dans script.js


// fonction à lancer pour que le joueur 2 puisse choisir sa loi parmi les 2 choix
function playerTwoLawSelection() {
    background([0,0,255]);
    createLaws(2);
    setLaws(lawsArray);
}

// fonction à lancer pour que le joueur 1 puisse choisir ses 2 lois parmi les 3 choix
function playerOneLawSelection() {
    background([0,0,255]);

    // afficher le message d'action a faire
    displayMessage(messages.tireTroisLois);
    createLaws(3);

    // Ajoute les listeners
    setTimeout(function() {generateLaw(0);}, 1000);
    setTimeout(function() {generateLaw(1);}, 1200);
    setTimeout(function() {generateLaw(2);}, 1400);

    // event listener pour envoyer le choix du DÉLÉGUÉ parmis les 2 cartes
    document.querySelector('.valider').addEventListener('click', sendChoicesToPlayerTwo);
}

// fonction à lancer pour la phase d'élimination
function elimination() {
    background([255,0,0]);
    displayElimination();
    setTimeout(eliminateSomeone, 500);
}


/***************
 *
 *   Introduction
 *
 ***************/

// indique aux joueurs de brancher leurs casques
function brancheCasque() {
    background([0,0,0]);
    displayMessage("replace", "Est-ce que ton casque est bien branché ?");
    displayButton("oui");
}

// indique aux joueurs d'aller s'installer à leur place
function installation() {
    background([0,0,0]);
    displayMessage("replace", "Tu es Ministre de l'Education. Tu peux aller t'installer à ta place");
    displayButton(["autre", "Je suis assis à ma place"]);

    // si les joueurs mettent trop de temps à se connecter.
    setTimeout(function () {
        displayMessage("add", "Dis-leur de se dépêcher, on a pas toute la nuit");
    }, 10000);
}

// demande aux joueurs s'ils ont compris ou pas les règles.
function ecouteDesRegles() {
    background([0,0,0]);
    displayButton(["autre", "J'ai compris les règles", "Je souhaite les réécouter"]);
    // displayButton(["autre", "Je souhaite les réécouter"]);
}

/***************
 *
 *   Fonctions pour le système d'élimination
 *
 ***************/

function displayElimination() {
    // allume toutes les LED en rouge pour 5 secondes

    // affiche sur l'écran qu'on rentre en phase d'élimination
    title.innerHTML = "Élimination";
}

function eliminateSomeone() {
    document.querySelector('.potentiometer').style.display = "block";
    placeCursorBeginning();
    document.body.addEventListener('touchmove', moveCursor);
    title.innerHTML = "";
    displayMessage("replace", messages.elimination);
    displayButton("valider");
    //return playerToEliminate;
}

function displayEliminatedPlayer() {

    displayMessage("replace", messages.joueurElimine + "Nom du joueur");

}

function giveYourVoteToSomeone() {

    displayMessage("replace", messages.donneTonVote);
    displayButton("valider");

}

function placeCursorBeginning() {

    let i = 180;

    //donne une taille au rond intérieur en fonction de la taille de wheel
    subwheel.style.width = Math.floor((wheel.clientWidth)/2) + "px";
    subwheel.style.height = Math.floor((wheel.clientHeight)/2) + "px";
    subwheel.style.borderRadius = Math.floor((wheel.clientWidth)/4) + "px";
    radius = parseInt(subwheel.style.borderRadius);

    let x = Math.cos(i*Math.PI/180) * radius;
    let y = Math.sin(i*Math.PI/180) * radius;

    // positionne le cursor
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";

    // lui donne le bon translate
    let borderParent = parseInt(subwheel.style.borderRadius);
    let valueTranslate = borderParent - Math.floor((cursor.clientWidth)/2);
    cursor.style.transform = "translate(" + valueTranslate + "px," + valueTranslate + "px)";

}

function moveCursor(e) {

    // on récupère la position x du doigt
    let posX = (e.targetTouches[0].clientX);

    // on récupère la largeur de la div qui va contenir l'arc de cercle et on calcule sa position par rapport à la taille de l'écran
    let widthWheel = (subwheel.clientWidth)*1.8; // on a appliqué un scale sur le
    let offsetLeftWheel = ((windowWidth-widthWheel)/2);

    // si le doigt n'est pas sur l'arc de cercle (qu'il est trop à gauche ou trop à droite) on normalise les valeurs
    if (posX < offsetLeftWheel) {
        posX = offsetLeftWheel;
    } else if (posX>widthWheel + offsetLeftWheel) {
        posX = widthWheel + offsetLeftWheel;
    }

    // on est sensé mapper cette position x pour obtenir un angle entre 0 et 360
    // ici on map entre -20 et 300 parce que ça rend plus facile la manipulation avec le doigt
    posX = map(posX, offsetLeftWheel, offsetLeftWheel+widthWheel, -20, 300);

    let i = 180 + (posX*180/(windowHeight));

    if (i<180) {
        i=180;
    } else if (i>360) {
        i=360;
    }

    console.log("i " + i);

    // calcule la position du disque sur l'arc de cercle
    // x et y sont inversés
    let x = Math.cos(i*Math.PI/180) * radius;
    let y = Math.sin(i*Math.PI/180) * radius;

    cursor.style.left = x + "px";
    cursor.style.top = y + "px";


    // on map la valeur de l'angle sur le nombre de joueurs (entre 0 et 30° = Joueur 0, entre 30 et 60 = Joueur 1 etc...)
    let selectedPlayer = map(i, 180, 360, 0, numberOfPlayers-1);

    // on affiche le nom du joueur sélectionné
    let playerName = subwheel.getElementsByTagName('p')[0];
    playerName.textContent = listeDesMinistres[selectedPlayer];


}

function hasardSelectionJoueur() {

    let message;

    setInterval(function() {
        let index = Math.floor(Math.random()*listeDesMinistres.length);
        message = listeDesMinistres[index];
        displayMessage("replace", message);
        // régler le style ? ici le message est un peu haut
        // document.getElementById("message").style.marginTop = "150px";
    }, 70);


}


/***************
 *
 *   Fonctions-outils
 *
 ***************/

function map(valueToMap, minInput, maxInput, minOutput, maxOutput) {

    return Math.floor((valueToMap - minInput) * (maxOutput - minOutput) / (maxInput - minInput) + minOutput);

}

function background(color) {

    document.getElementsByTagName('html')[0].style.backgroundColor = "rgb(" + color[0] + "," +  color[1] + "," + color[2] + ")";
}




/***************
 *
 *   Fonctions communes aux deux phases de vote
 *
 ***************/

// crée les x emplacements pour les lois
function createLaws(nbCards) {

    let lawsBlock = document.querySelector('.laws');
    for (let i=0; i<nbCards; i++) {
        let oneLaw = document.createElement("div");
        oneLaw.className += "law";
        oneLaw.className += " law-" + i;
        oneLaw.setAttribute('data-id', i.toString());
        lawsBlock.appendChild(oneLaw);
    }
}





/***************
 *
 *   Fonctions relatives à la deuxième phase de vote (joueur 2 choisi 1 lois parmi 2)
 *
 ***************/

// affiche les deux lois choisies par le J1
function setLaws(lawsArray) {

    let laws = document.getElementsByClassName('law');

    for (let i=0; i<laws.length; i++) {
        laws[i].classList.add(lawsArray[i]);
        laws[i].addEventListener('click', selectOneLaw);
        let lawContent = document.createElement("p");
        let cardType = lawsArray[i];
        if (cardType === "humaniste") {
            cardType = "Humaniste"
        } else if (cardType === "progressiste") {
            cardType = "Progressiste";
        }
        lawContent.textContent = "Loi " + cardType;
        laws[i].appendChild(lawContent);
    }



}

// permet au J2 de sélectionner une loi à envoyer
function selectOneLaw(e) {

    let currentSelectedLaws = document.getElementsByClassName("selectedLaw").length;

    let thisLaw = e.target;

    if (thisLaw.classList.contains("selectedLaw")) {
        thisLaw.classList.remove("selectedLaw");
        removeWarning();
    } else {
        if (currentSelectedLaws<1) {
            thisLaw.classList.add("selectedLaw");
            removeWarning();
        } else {
            displayWarning(warnings.maxOneLaw);
        }

    }

    currentSelectedLaws = document.getElementsByClassName("selectedLaw").length;
    console.log(currentSelectedLaws);

    if (currentSelectedLaws === 1) {
        displayButton("valider");
    } else {
        removeButtons();
    }

}



/***************
 *
 *   Fonctions relatives à la première phase de vote (joueur 1 choisi 2 lois parmi 3)
 *
 ***************/


// choisit une loi au hasard après le setTimeout
function generateLaw(i) {

    //var thisLaw = document.getElementById(e.target.id);

    let thisLaw = document.getElementsByClassName('law')[i];

    let lawType = ["Humaniste", "Progressiste"];
    let index = Math.floor(Math.random()*lawType.length);
    let cardType = lawType[index];
    let oneLaw = thisLaw;
    oneLaw.className += " " + cardType.toLowerCase();
    let lawContent = document.createElement("p");
    lawContent.textContent = "Loi " + cardType;
    oneLaw.appendChild(lawContent);

    thisLaw.removeEventListener('click', generateLaw);

    displayedLaws++;

    // quand trois lois sont affichées, on a la possibilité de les choisir
    if (displayedLaws === 3) {
        displayMessage("replace", messages.choisiDeuxLois);
        let laws = document.getElementsByClassName("law");
        for (let i=0; i<laws.length; i++) {
            laws[i].addEventListener('click', selectTwoLaws);
        }
    }

}

// permet au MINITSTRE ACTIF de sélectionner les deux lois à envoyer
function selectTwoLaws(e) {

    let currentSelectedLaws = document.getElementsByClassName("selectedLaw").length;

    console.log(e);
    let thisLaw = e.target;

    if (thisLaw.classList.contains("selectedLaw")) {
        thisLaw.classList.remove("selectedLaw");
        removeWarning();
    } else {
        if (currentSelectedLaws<2) {
            thisLaw.classList.add("selectedLaw");
            removeWarning();
        } else {
            displayWarning(warnings.maxTwoLaws);
        }

    }

    currentSelectedLaws = document.getElementsByClassName("selectedLaw").length;
    console.log(currentSelectedLaws);

    if (currentSelectedLaws === 2) {
        displayButton("valider");
    } else {
        removeButtons();
    }

}

// Quand on clique sur "Valider" ça envoie les choix au Délégué
function sendChoicesToPlayerTwo() {

    let lawsArray = {   '0':'',
        '1':''};
    let selectedLaws = document.getElementsByClassName("selectedLaw");

    for(let i=0; i<selectedLaws.length; i++) {
        console.log(selectedLaws[i].classList);
        if (selectedLaws[i].classList[2] === "humaniste" || selectedLaws[i].classList[2] === "progressiste") {
            lawsArray[i] = selectedLaws[i].classList[2]; // la class 1 correspond au type de loi
        } else {
            console.log("classList[1] ne correspond pas au type de loi");
        }

    }

    // à récupérer pour le socket
    console.log(lawsArray);

    document.querySelector('.valider').removeEventListener('click', sendChoicesToPlayerTwo);

}

/***************
 *
 *   Fonctions relatives à l'affichage des éléments textuels : boutons, messages, warnings
 *
 ***************/

// Affiche les différents éléments d'interface -

// on peut soit envoyer un nom de bouton si c'est oui/non/valider, par ex : displayButton("valider")
// soit envoyer un tableau de boutons : displayButton(["oui", "non"])
// soit envoyer un ou plusieurs bouton(s) personnalisé(s) (autre) : displayButton(["autre", "nom du bouton", "nom de l'autre bouton"]);
function displayButton(buttonToDisplay) {

    let button;

    console.log(buttonToDisplay);

    if(typeof buttonToDisplay !== "string") { // c'est-à-dire si c'est un tableau, par exemple si on veut ajouter plusieurs boutons ("oui" et "non" par ex)
        if (buttonToDisplay[0] === "autre") { // si c'est un bouton personnalisé
            button = document.getElementsByClassName(buttonToDisplay[0]);
            for (let i=1; i<buttonToDisplay.length; i++) {
                button[i-1].textContent = buttonToDisplay[i];
                button[i-1].classList.add('active');
            }

        } else {
            button = [];
            for (let i=0; i<buttonToDisplay.length; i++) {
                button[i] = document.querySelector("." + buttonToDisplay[i]);
                button[i].classList.add('active');
            }
        }
    } else {
        button = document.querySelector("." + buttonToDisplay);
        button.classList.add('active');
    }
}

// supprimer tous les boutons
function removeButtons() {
    let buttons = document.getElementsByTagName('button');
    for (let i=0; i<buttons.length; i++) {
        buttons[i].classList.remove('active');
    }

}

/// MESSAGE
// envoyer un message
function displayMessage(mode, message) {

    if (mode === "add") {
        let blocMessage = document.querySelector('.message').getElementsByTagName('p')[0];
        blocMessage.innerHTML += "<br>"+message;
    }

    if (mode === "replace") {
        let blocMessage = document.querySelector('.message').getElementsByTagName('p')[0];
        blocMessage.textContent = message;
    }


}

// WARNING
/// afficher un warning
function displayWarning(warning) {
    let blocWarning = document.querySelector('.warning');
    blocWarning.textContent = warning;
    blocWarning.classList.add('active');

}

/// surpimer warning
function removeWarning() {
    let blocWarning = document.querySelector('.warning');
    blocWarning.classList.remove('active');
}


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PlayerTemplate = (function () {
    function PlayerTemplate(initParam) {
        this.player_info = {
            index: initParam.setIndex,
            status: initParam.setStatus,
            rules: initParam.setRules,
            buttons: initParam.setButtons,
        };
        this.setElements(initParam.indexElement, initParam.statusElement, initParam.rulesElement, initParam.buttonsElement);
        this.initTemplate();
        this.setValues(this.player_info);
    }
    PlayerTemplate.prototype.setElements = function (indexElement, statusElement, rulesElement, buttonsElement) {
        this.player_elements = {
            index: indexElement,
            status: statusElement,
            rules: rulesElement,
            buttons: buttonsElement,
        };
    };
    PlayerTemplate.prototype.initTemplate = function () {
        this.player_elementsTemplate = {
            index: this.player_elements.index.innerHTML,
            status: this.player_elements.status.innerHTML,
            rules: this.player_elements.rules.innerHTML,
            buttons: this.player_elements.buttons.innerHTML,
        };
    };
    PlayerTemplate.prototype.setValues = function (patern) {
        console.log(patern);
        var renderIndex = Mustache.render(this.player_elementsTemplate.index, patern);
        var renderStatus = Mustache.render(this.player_elementsTemplate.status, patern);
        var renderRules = Mustache.render(this.player_elementsTemplate.rules, patern);
        var renderButtons = Mustache.render(this.player_elementsTemplate.buttons, patern);
        this.player_elements.index.innerHTML = renderIndex;
        this.player_elements.status.innerHTML = renderStatus;
        this.player_elements.rules.innerHTML = renderRules;
        this.player_elements.buttons.innerHTML = renderButtons;
    };
    return PlayerTemplate;
}());
exports.default = PlayerTemplate;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SocketClientApp = (function () {
    function SocketClientApp() {
    }
    SocketClientApp.run = function (playerTemplate, currentHostname) {
        var socket = io.connect("http://" + currentHostname + ":1337");
        socket.on("connect", function () {
            console.log("socket client player connected");
            socket.emit('player-connected', {
                name: "player"
            });
        });
        socket.on("init", function (data) {
            playerTemplate.setValues(data);
            var allButtons = document.querySelectorAll(".buttons button");
            for (var i = 0; i < allButtons.length; i++) {
                allButtons[i].addEventListener("click", function (e) {
                    socket.emit("player-responses", e.target.innerHTML);
                    for (var j = 0; j < allButtons.length; j++) {
                        allButtons[j].style.display = "none";
                    }
                });
            }
        });
    };
    return SocketClientApp;
}());
exports.default = SocketClientApp;


/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var socketClientApp_1 = __webpack_require__(6);
var playerTemplate_1 = __webpack_require__(5);
var LoadJs_1 = __webpack_require__(0);
var locationInfo_1 = __webpack_require__(1);
var sequences = __webpack_require__(2);
var initParam = {
    setIndex: 'en attente…',
    setStatus: 'en attente…',
    setRules: 'attend les propositions que je te proposerais. =)',
    setButtons: [],
    indexElement: document.querySelector("#index"),
    statusElement: document.querySelector("#status"),
    rulesElement: document.querySelector("#rules"),
    buttonsElement: document.querySelector(".buttons"),
};
var playerTemplate = new playerTemplate_1.default(initParam);
var locationInfo = new locationInfo_1.default(window.location.href);
var currentHostname = locationInfo.parse.hostname;
LoadJs_1.default.load("http://" + currentHostname + ":1337/socket.io/socket.io.js").addEventListener("load", function () {
    socketClientApp_1.default.run(playerTemplate, currentHostname);
});
console.log(radius);
window.playerOneLawSelection = function () { sequences.playerOneLawSelection(); };
window.playerTwoLawSelection = function () { sequences.playerTwoLawSelection(); };
window.elimination = function () { sequences.elimination(); };
window.installation = function () { sequences.installation(); };
window.brancheCasque = function () { sequences.brancheCasque(); };
window.hasardSelectionJoueur = function () { sequences.hasardSelectionJoueur(); };
window.ecouteDesRegles = function () { sequences.ecouteDesRegles(); };


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map