"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setControlPlayerData_1 = require("./setControlPlayerData");
class SetPlayerData {
    static send(socket, player, data, players, controller, forceSendTo) {
        socket.emit("init", data);
        player.data = data;
        if (forceSendTo) {
            setControlPlayerData_1.default.sendTo(socket, players, controller);
        }
        else {
            setControlPlayerData_1.default.send(socket, players);
        }
    }
    static sendTo(socket, players, playerIndexToSend, data, controller, forceSendTo) {
        socket.to(players.player[playerIndexToSend - 1].socketId).emit("init", data);
        players.player[playerIndexToSend - 1].data = data;
        if (forceSendTo) {
            setControlPlayerData_1.default.sendTo(socket, players, controller);
        }
        else {
            setControlPlayerData_1.default.send(socket, players);
        }
    }
    static getPlayer(players, playerIndex) {
        return players.player[playerIndex - 1];
    }
}
exports.default = SetPlayerData;
