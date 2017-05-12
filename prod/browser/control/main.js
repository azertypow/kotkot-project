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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var removeSleepMode = (function () {
    function removeSleepMode() {
    }
    removeSleepMode.run = function () {
        var noSleep = new NoSleep();
        noSleep.enable();
        console.log("sleep cut");
    };
    return removeSleepMode;
}());
exports.default = removeSleepMode;


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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ManagePlayers = (function () {
    function ManagePlayers() {
    }
    ManagePlayers.run = function (selectedPlayers) {
        var nbPlayers = 6;
        setup();
        function setup() {
            addPlayersToInterface(nbPlayers);
        }
        function removePlayer(playerToRemove, playerId) {
            console.log("removeplayer");
            playerToRemove.classList.remove('playerSelected');
            playerToRemove.removeAttribute('style');
            var id = selectedPlayers.indexOf(playerId);
            selectedPlayers.splice(id, 1);
        }
        function addPlayers(e) {
            console.log(e.target.className);
            var list = e.target.className;
            var lastCharacter = e.target.textContent.length;
            var selectedPlayer = parseInt(e.target.textContent[lastCharacter - 1]);
            if (list.indexOf('playerSelected') !== -1) {
                console.log('deja');
                removePlayer(e.target, selectedPlayer);
                return;
            }
            console.log(e.target.textContent.length);
            var player = e.target;
            player.className += " playerSelected";
            player.style.backgroundColor = "#0ff";
            selectedPlayers.push(selectedPlayer);
            console.log(selectedPlayers);
        }
        function addPlayersToInterface(nbPlayers) {
            console.log("addplayers");
            var playerSection = document.getElementById('players');
            var boxPlayers = document.createElement('div');
            boxPlayers.setAttribute('id', 'boxplayers');
            playerSection.appendChild(boxPlayers);
            for (var i = 1; i < nbPlayers + 1; i++) {
                var aPlayer = document.createElement("p");
                aPlayer.setAttribute("class", "aPlayer" + " aPlayer-" + i);
                aPlayer.textContent = "Joueur " + i;
                boxPlayers.appendChild(aPlayer);
            }
            var players = document.getElementsByClassName('aPlayer');
            for (var j = 0; j < players.length; j++) {
                players[j].addEventListener('click', addPlayers);
            }
        }
    };
    return ManagePlayers;
}());
exports.default = ManagePlayers;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var socketRulesButtonEmit_1 = __webpack_require__(9);
var controlTemplate_1 = __webpack_require__(7);
var socketControlApp = (function () {
    function socketControlApp() {
    }
    socketControlApp.run = function (selectedPlayers, currentHostname) {
        var socket = io.connect("http://" + currentHostname + ":1337");
        socket.on("connect", function () {
            console.log("socket control connected");
            socket.emit('control-connected', {
                name: "control"
            });
        });
        var controlTemplate = new controlTemplate_1.default(document.querySelector("#players-status"));
        console.log(controlTemplate);
        socket.on("init-control-players-status", function (data) {
            console.log(data);
            var dataToSend = {
                players: [],
            };
            for (var key in data.player) {
                var mustashPatern = {
                    "range": data.player[key].data.index,
                    "ip": data.player[key].ipValue,
                    "current-rule": data.player[key].data.rules,
                    "status": data.player[key].data.status,
                };
                dataToSend.players.push(mustashPatern);
            }
            console.log(dataToSend);
            controlTemplate.render(dataToSend);
        });
        socketRulesButtonEmit_1.default.run(socket, selectedPlayers);
        socket.on("player-responses", function (data) {
            document.querySelector(".user-response").innerHTML = data;
        });
    };
    return socketControlApp;
}());
exports.default = socketControlApp;


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ControlTemplate = (function () {
    function ControlTemplate(element) {
        this.playerTemplate = element.innerHTML;
        this.element = element;
    }
    ControlTemplate.prototype.render = function (data) {
        var renderStatus = Mustache.render(this.playerTemplate, data);
        this.element.innerHTML = renderStatus;
        console.log(renderStatus);
    };
    return ControlTemplate;
}());
exports.default = ControlTemplate;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var socketControlApp_1 = __webpack_require__(3);
var removeSleepMode_1 = __webpack_require__(0);
var managePlayers_1 = __webpack_require__(2);
var LoadJs_1 = __webpack_require__(12);
var locationInfo_1 = __webpack_require__(1);
var selectedPlayers = [];
removeSleepMode_1.default.run();
var locationInfo = new locationInfo_1.default(window.location.href);
var currentHostname = locationInfo.parse.hostname;
LoadJs_1.default.load("http://" + currentHostname + ":1337/socket.io/socket.io.js").addEventListener("load", function () {
    socketControlApp_1.default.run(selectedPlayers, currentHostname);
    managePlayers_1.default.run(selectedPlayers);
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var jsonData_1 = __webpack_require__(11);
var SocketRulesButtonEmit = (function () {
    function SocketRulesButtonEmit() {
    }
    SocketRulesButtonEmit.run = function (socket, selectedPlayers) {
        var _this = this;
        var controls = document.querySelector("#controls").innerHTML;
        document.querySelector("#controls").innerHTML = Mustache.render(controls, jsonData_1.default.rulesAndButtons);
        var controlSubCategories = document.querySelectorAll("#controls div");
        for (var i = 0; i < controlSubCategories.length; i++) {
            var buttonChild = controlSubCategories[i].querySelectorAll(".data-button");
            for (var j = 0; j < buttonChild.length; j++) {
                buttonChild[j].setAttribute("data-index", j.toString());
            }
        }
        var buttons = document.querySelectorAll(".data-button");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function (e) {
                _this.sendProposition(e, socket, selectedPlayers);
            });
        }
    };
    SocketRulesButtonEmit.sendProposition = function (e, socket, selectedPlayers) {
        console.log(selectedPlayers);
        console.log(e.target);
        var data = {
            rules: e.target.textContent,
            selectedPlayers: selectedPlayers,
            category: e.target.getAttribute("data-array"),
            indexCategory: e.target.getAttribute("data-index"),
        };
        socket.emit('control-directive', data);
    };
    return SocketRulesButtonEmit;
}());
exports.default = SocketRulesButtonEmit;


/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JsonData = (function () {
    function JsonData() {
    }
    return JsonData;
}());
JsonData.rulesAndButtons = {
    loisJ1: [
        { text: "Je te propose trois lois de Gauche",
            buttons: [
                "Proposer deux lois de gauche",
            ]
        },
        { text: "Je te propose deux lois de Gauche et une loi de Droite",
            buttons: [
                "Proposer deux lois de gauche",
                "Proposer une loi de gauche et une loi de droite"
            ]
        },
        { text: "Je te propose une loi Gauche et deux lois de Droite",
            buttons: [
                "Proposer deux lois de droite",
                "Proposer une loi de gauche et une loi de droite"
            ]
        },
        { text: "Je te propose trois lois de Droite",
            buttons: [
                "Proposer deux lois de droite",
            ]
        },
    ],
    loisJ2: [
        { text: "L'autre joueur te propose deux lois de Gauche",
            buttons: [
                "Valider une loi de gauche",
            ]
        },
        { text: "L'autre joueur te propose une loi de Gauche et une loi de Droite",
            buttons: [
                "Valider une loi de gauche",
                "Valider une loi de droite",
            ]
        },
        { text: "L'autre joueur te propose deux lois de Droite",
            buttons: [
                "Valider une loi de droite",
            ]
        },
    ],
    annonces: [
        { text: "Une loi vient d'être votée. Vous pouvez maintenant la valider ou la rejeter. Souhaitez-vous la valider ?",
            buttons: [
                "oui",
                "non"
            ]
        },
        { text: "La loi a été acceptée", buttons: [] },
        { text: "La loi a été refusée", buttons: [] },
        { text: "C'est une loi de Gauche", buttons: [] },
        { text: "C'est une loi de Droite", buttons: [] },
    ],
    narration: [
        { text: "Bienvenue dans le jeu. Vous allez devoir voter assez de lois pour faire gagner votre parti. Vous serez amené à évincer des joueurs au cours de la partie. Méfiez-vous, une fois éliminés, ces joueurs peuvent donner leur droit de vote à un joueur restant. Attention, deux cyborgs se sont glissés dans chaque équipe, leur but est de prendre le pouvoir en obtenant le droit de vote le plus puissant.", buttons: [] },
        { text: "Vous appartenez au Parti de Gauche. Votre but est de faire passer 5 lois de gauche ou d'éliminer tous les membres du parti de Droite. Attention, les cyborgs ne doivent pas prendre le pouvoir.", buttons: [] },
        { text: "Vous appartenez au Parti de Droite. Votre but est de faire passer 5 lois de droite ou d'éliminer tous les membres du parti de Gauche. Attention, les cyborgs ne doivent pas prendre le pouvoir.", buttons: [] },
        { text: "Vous appartenez au Parti de Gauche. Vous êtes un cyborg. Votre but est d'obtenir le droit de vote le plus puissant.", buttons: [] },
        { text: "Vous appartenez au Parti de Droite. Vous êtes un cyborg. Votre but est d'obtenir le droit de vote le plus puissant.", buttons: [] },
    ],
    cyborg: [
        { text: "La loi qui vient d'être refusée était de Gauche", buttons: [] },
        { text: "La loi qui vient d'être refusée était de Droite", buttons: [] },
        { text: "Trois membres du parti de gauche son côte à côte", buttons: [] },
        { text: "Trois membres du parti de droite son côte à côte", buttons: [] },
        { text: "Deux membres du parti de gauche son face à face", buttons: [] },
        { text: "Deux membres du parti de droite son face à face", buttons: [] },
        { text: "La personne qui vient d'être éliminée était de Droite", buttons: [] },
        { text: "La personne qui vient d'être éliminée était de Gauche", buttons: [] },
        { text: "La personne qui vient d'être éliminée a donné sa voix à un membre du parti de Gauche", buttons: [] },
        { text: "La personne qui vient d'être éliminée a donné sa voix à un membre du parti de Droite", buttons: [] },
        { text: "Il reste trois membres du parti de Gauche", buttons: [] },
        { text: "Il reste trois membres du parti de Droite", buttons: [] },
        { text: "Le cyborg adverse a été éliminé", buttons: [] },
        { text: "Le cyborg adverse a plus d'une voix", buttons: [] },
        { text: "Tu es proche de l'autre cyborg", buttons: [] },
    ],
    humain: [
        { text: "Il fait beau dehors ?", buttons: ["oui", "non"] },
        { text: "tous se passe bien?", buttons: ["oui", "non"] },
        { text: "Il fait beau dehors ?", buttons: ["oui", "non"] },
        { text: "Votre parti est en minorité, il faudrait se remuer", buttons: [] },
        { text: "Votre parti est en minorité, mais vous avez plus de poids dans le vote", buttons: [] },
        { text: "Votre parti est en majorité, ne vous reposez pas sur vos lauriers", buttons: [] },
        { text: "Vous devriez vous méfier de votre voisin", buttons: [] },
    ],
};
exports.default = JsonData;


/***/ }),
/* 12 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map