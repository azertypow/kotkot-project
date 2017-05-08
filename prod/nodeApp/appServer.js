"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var staticServer_1 = require("./staticServer");
var socketControl_1 = require("./socketControl");
var AppServer = (function () {
    function AppServer() {
    }
    AppServer.run = function (port) {
        var httpServer = staticServer_1.default.run("1337");
        socketControl_1.default.connection(httpServer);
    };
    return AppServer;
}());
exports.default = AppServer;
