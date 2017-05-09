"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SetControlPlayerData = (function () {
    function SetControlPlayerData() {
    }
    SetControlPlayerData.send = function (socket, players) {
        socket.emit("init-control-players-status", players);
    };
    SetControlPlayerData.sendTo = function (socket, players, controller) {
        if (controller !== undefined) {
            socket.to(controller.socketId).emit("init-control-players-status", players);
        }
    };
    return SetControlPlayerData;
}());
exports.default = SetControlPlayerData;
