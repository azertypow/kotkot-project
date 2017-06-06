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
        const currentPlayer = socketControl_1.default.players.player[playerIndexToSend];
        socketControl_1.default.ioServer.to(currentPlayer.socketId).emit(functionName, functionArguments);
        currentPlayer.data.action = {
            options: functionArguments,
            emit: functionName,
        };
        console.log(currentPlayer);
    }
    ;
}
exports.default = SetPlayerData;
