"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SetPlayerData = (function () {
    function SetPlayerData() {
    }
    SetPlayerData.send = function (socket, player, data) {
        socket.emit("init", data);
        player.data = data;
    };
    SetPlayerData.sendTo = function (socket, players, playerIdToSend, data) {
        socket.to(players.player[playerIdToSend - 1].socketId).emit("init", data);
        players.player[playerIdToSend - 1].data = data;
    };
    return SetPlayerData;
}());
exports.default = SetPlayerData;
