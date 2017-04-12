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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SocketClientApp = (function () {
    function SocketClientApp() {
    }
    SocketClientApp.run = function () {
        var socket = io.connect('http://localhost:1337');
        document.querySelector("h1").addEventListener("click", function (e) {
            console.log("clicked");
            e.preventDefault();
            socket.emit('click', {
                username: "nom"
            });
        });
    };
    return SocketClientApp;
}());
exports.default = SocketClientApp;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var socketClientApp_1 = __webpack_require__(0);
var playerTemplate_1 = __webpack_require__(3);
socketClientApp_1.default.run();
var playerTemplate = new playerTemplate_1.default('1', 'pusher', 'attend ton tour pour jouer');
var playerElementIndex = document.querySelector("#index");
var playerElementStatus = document.querySelector("#status");
var playerElementRules = document.querySelector("#rules");
playerTemplate.setElements(playerElementIndex, playerElementStatus, playerElementRules);
playerTemplate.initValues();
var patern = {
    index: 1,
    status: "pusher",
    rules: "attend les ordre que l'on va te dicter petite merde d'humain"
};
playerTemplate.setValues(patern);


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PlayerTemplate = (function () {
    function PlayerTemplate(setIndex, setStatus, setRules) {
        this.player_info = {
            index: setIndex,
            status: setStatus,
            rules: setRules
        };
    }
    PlayerTemplate.prototype.setElements = function (indexElement, statusElement, rulesElement) {
        this.player_elements = {
            index: indexElement,
            status: statusElement,
            rules: rulesElement
        };
    };
    PlayerTemplate.prototype.initValues = function () {
        this.player_elementsTemplate = {
            index: this.player_elements.index.innerHTML,
            status: this.player_elements.status.innerHTML,
            rules: this.player_elements.rules.innerHTML
        };
    };
    PlayerTemplate.prototype.setValues = function (patern) {
        var renderIndex = Mustache.render(this.player_elementsTemplate.index, patern);
        var renderStatus = Mustache.render(this.player_elementsTemplate.status, patern);
        var renderRules = Mustache.render(this.player_elementsTemplate.rules, patern);
        this.player_elements.index.innerHTML = renderIndex;
        this.player_elements.status.innerHTML = renderStatus;
        this.player_elements.rules.innerHTML = renderRules;
    };
    return PlayerTemplate;
}());
exports.default = PlayerTemplate;


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map