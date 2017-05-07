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
var PlayerTemplate = (function () {
    function PlayerTemplate(initParam) {
        this.player_info = {
            index: initParam.setIndex,
            status: initParam.setStatus,
            rules: initParam.setRules
        };
        this.setElements(initParam.indexElement, initParam.statusElement, initParam.rulesElement);
        this.initTemplate();
        this.setValues(this.player_info);
    }
    PlayerTemplate.prototype.setElements = function (indexElement, statusElement, rulesElement) {
        this.player_elements = {
            index: indexElement,
            status: statusElement,
            rules: rulesElement
        };
    };
    PlayerTemplate.prototype.initTemplate = function () {
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


/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locationInfo_1 = __webpack_require__(5);
var SocketClientApp = (function () {
    function SocketClientApp() {
    }
    SocketClientApp.run = function () {
        var locationInfo = new locationInfo_1.default("window.location.href");
        var currentHostname = locationInfo.parse.hostname;
        var socket = io.connect("http://" + currentHostname + ":1337");
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
/* 3 */,
/* 4 */,
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var socketClientApp_1 = __webpack_require__(2);
var playerTemplate_1 = __webpack_require__(0);
var removeSleepMode_1 = __webpack_require__(1);
socketClientApp_1.default.run();
removeSleepMode_1.default.run();
var initParam = {
    setIndex: 'en attente…',
    setStatus: 'en attente…',
    setRules: 'attend les propositions que je te proposerais. =)',
    indexElement: document.querySelector("#index"),
    statusElement: document.querySelector("#status"),
    rulesElement: document.querySelector("#rules")
};
var playerTemplate = new playerTemplate_1.default(initParam);
document.querySelector("h1").addEventListener("click", function () {
    var patern = {
        index: 1,
        status: "pusher",
        rules: "attend les ordre que l'on va te dicter petite merde d'humain"
    };
    playerTemplate.setValues(patern);
});


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map