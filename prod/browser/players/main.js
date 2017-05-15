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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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
/* 2 */,
/* 3 */,
/* 4 */
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
/* 5 */
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
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var socketClientApp_1 = __webpack_require__(5);
var playerTemplate_1 = __webpack_require__(4);
var removeSleepMode_1 = __webpack_require__(0);
var LoadJs_1 = __webpack_require__(12);
var locationInfo_1 = __webpack_require__(1);
removeSleepMode_1.default.run();
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


/***/ }),
/* 11 */,
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