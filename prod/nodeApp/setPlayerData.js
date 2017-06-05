"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketControl_1 = require("./socketControl");
class SetPlayerData {
    static send(socket, player, data) {
        socket.emit("init", data);
        player.data = data;
    }
    static sendTo(socket, players, playerIndexToSend, data) {
        socket.to(players.player[playerIndexToSend].socketId).emit("init", data);
        players.player[playerIndexToSend].data = data;
    }
    static getPlayer(players, playerIndex) {
        return players.player[playerIndex];
    }
    static directive(functionName, functionArguments, playerIndexToSend) {
        socketControl_1.default.ioServer.to(socketControl_1.default.players.player[playerIndexToSend].socketId).emit(functionName, functionArguments);
        socketControl_1.default.ioServer.to(socketControl_1.default.players.player[playerIndexToSend].socketId).emit("log", functionName);
        socketControl_1.default.ioServer.to(socketControl_1.default.players.player[playerIndexToSend].socketId).emit("log", functionArguments);
    }
    ;
}
exports.default = SetPlayerData;
