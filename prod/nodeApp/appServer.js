"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io");
var staticServer_1 = require("./staticServer");
var AppServer = (function () {
    function AppServer() {
    }
    AppServer.run = function (port) {
        var httpServer = staticServer_1.default.run("1337");
        var ioServer = io.listen(httpServer);
        ioServer.sockets.on("connection", function (socket) {
            console.log("nouvelle utilisateur connecté");
            socket.on("disconnect", function () {
                console.log("un joueur s'est deconnecté");
            });
            socket.on("click", function (user) {
                console.log("click");
                console.log(user);
            });
        });
    };
    return AppServer;
}());
exports.default = AppServer;
