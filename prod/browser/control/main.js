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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
var socketEmitButton_1 = __webpack_require__(7);
var socketControlApp = (function () {
    function socketControlApp() {
    }
    socketControlApp.run = function () {
        var locationInfo = new locationInfo_1.default("window.location.href");
        var currentHostname = locationInfo.parse.hostname;
        var socket = io.connect("http://" + currentHostname + ":1337");
        socket.on("connect", function () {
            console.log("socket control connected");
            socket.emit('control-connected', {
                name: "control"
            });
        });
        document.querySelector(".rul").addEventListener("click", function () {
            console.log("click");
            socket.emit("control-clicked", {
                index: 1,
                rules: "ok",
                status: "haha"
            });
        });
        socketEmitButton_1.default.run(socket);
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
var socketControlApp_1 = __webpack_require__(2);
var removeSleepMode_1 = __webpack_require__(0);
removeSleepMode_1.default.run();
socketControlApp_1.default.run();


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SocketEmitButton = (function () {
    function SocketEmitButton() {
    }
    SocketEmitButton.run = function (socket) {
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
            socket.emit('control-directive', {
                "buttonValue": e.target.textContent
            });
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


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map