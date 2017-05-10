"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setControlPlayerData_1 = require("./setControlPlayerData");
var SetPlayerData = (function () {
    function SetPlayerData() {
    }
    SetPlayerData.send = function (socket, player, data, players, controller, forceSendTo) {
        socket.emit("init", data);
        player.data = data;
        if (forceSendTo) {
            setControlPlayerData_1.default.sendTo(socket, players, controller);
        }
        else {
            setControlPlayerData_1.default.send(socket, players);
        }
    };
    SetPlayerData.sendTo = function (socket, players, playerIndexToSend, data, controller, forceSendTo) {
        socket.to(players.player[playerIndexToSend - 1].socketId).emit("init", data);
        players.player[playerIndexToSend - 1].data = data;
        if (forceSendTo) {
            setControlPlayerData_1.default.sendTo(socket, players, controller);
        }
        else {
            setControlPlayerData_1.default.send(socket, players);
        }
    };
    SetPlayerData.getPlayer = function (players, playerIndex) {
        return players.player[playerIndex - 1];
    };
    return SetPlayerData;
}());
exports.default = SetPlayerData;
