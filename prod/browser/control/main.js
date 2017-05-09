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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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
var locationInfo_1 = __webpack_require__(1);
var socketEmitButton_1 = __webpack_require__(8);
var controlTemplate_1 = __webpack_require__(6);
var socketControlApp = (function () {
    function socketControlApp() {
    }
    socketControlApp.run = function (selectedPlayers) {
        var locationInfo = new locationInfo_1.default("window.location.href");
        var currentHostname = locationInfo.parse.hostname;
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
                    "range": data.player[key].id + 1,
                    "ip": data.player[key].ipValue,
                    "current-rule": data.player[key].data.rules,
                };
                dataToSend.players.push(mustashPatern);
            }
            console.log(dataToSend);
            controlTemplate.render(dataToSend);
        });
        socketEmitButton_1.default.run(socket, selectedPlayers);
    };
    return socketControlApp;
}());
exports.default = socketControlApp;


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var socketControlApp_1 = __webpack_require__(2);
var removeSleepMode_1 = __webpack_require__(0);
var managePlayers_1 = __webpack_require__(10);
var selectedPlayers = [];
removeSleepMode_1.default.run();
socketControlApp_1.default.run(selectedPlayers);
managePlayers_1.default.run(selectedPlayers);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SocketEmitButton = (function () {
    function SocketEmitButton() {
    }
    SocketEmitButton.run = function (socket, selectedPlayers) {
        var json = {
            loisJ1: [
                "Je te propose trois lois de Gauche",
                "Je te propose deux lois de Gauche et une loi de Droite",
                "Je te propose une loi Gauche et deux lois de Droite",
                "Je te propose trois lois de Droite",
                "Premier choix : veux-tu proposer une loi de Gauche ?",
                "Premier choix : veux-tu proposer une loi de Droite ?",
                "Deuxième choix : veux-tu proposer une loi de Gauche ?",
                "Deuxième choix : veux-tu proposer une loi de Droite ?",
                "Choix validé",
                "Choix refusé, cette option n'est pas disponible"
            ],
            loisJ2: ["L'autre joueur te propose deux lois de Gauche",
                "L'autre joueur te propose une loi de Gauche et une loi de Droite",
                "L'autre joueur te propose deux lois de Droite",
                "Veux-tu proposer une loi de Gauche ?",
                "Veux-tu proposer une loi de Droite ?",
                "Choix validé",
                "Choix refusé, cette option n'est pas disponible"
            ],
            narration: [
                "Bienvenue dans le jeu",
                "Vous appartenez au Parti de Gauche. Votre but est de...",
                "Vous appartenez au Parti de Droite. Votre but est de..."
            ]
        };
        var singleControl = document.getElementsByClassName("control");
        var propositions = document.getElementsByClassName("proposition");
        for (var i = 0; i < singleControl.length; i++) {
            singleControl[i].addEventListener('click', displayPropositions);
        }
        for (var j = 0; j < propositions.length; j++) {
            propositions[j].addEventListener('click', sendProposition);
        }
        function sendProposition(e) {
            console.log(selectedPlayers);
            var data = {
                rules: e.target.textContent,
                selectedPlayers: selectedPlayers,
            };
            socket.emit('control-directive', data);
        }
        function displayPropositions(e) {
            if ((e.target.classList[0]) !== "control") {
                if ((e.target.classList[0]) === "proposition") {
                    sendProposition(e);
                    return;
                }
                else {
                    console.log("wrong element - l'élément n'a pas la class 'control'");
                    return;
                }
            }
            var currentElement = e.target;
            var currentClass = e.target.classList[1];
            if (document.getElementById('proposition') !== null) {
                var prop = document.getElementById('proposition');
                prop.parentNode.removeChild(prop);
            }
            var propositions = document.createElement("div");
            propositions.setAttribute("id", "proposition");
            currentElement.appendChild(propositions);
            for (var i = 0; i < json[currentClass].length; i++) {
                var sentence = document.createElement("p");
                sentence.setAttribute("class", "proposition" + " proposition-" + i);
                sentence.textContent = json[currentClass][i];
                propositions.appendChild(sentence);
            }
        }
    };
    return SocketEmitButton;
}());
exports.default = SocketEmitButton;


/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ManagePlayers = (function () {
    function ManagePlayers() {
    }
    ManagePlayers.run = function (selectedPlayers) {
        var nbPlayers = 8;
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


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map