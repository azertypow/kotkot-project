"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SetPlayerData {
    static send(socket, player, data) {
        socket.emit("init", data);
        player.data = data;
    }
    static sendTo(socket, players, playerIndexToSend, data) {
        socket.to(players.player[playerIndexToSend].socketId).emit("displayEliminatedPlayer", "jorge");
        socket.to(players.player[playerIndexToSend].socketId).emit("log", `players.player[playerIndexToSend].socketId: ${players.player[playerIndexToSend].socketId}`);
        socket.to(players.player[playerIndexToSend].socketId).emit("log", `socket: ${socket}`);
        socket.to(players.player[playerIndexToSend].socketId).emit("log", `players: ${players}`);
        socket.to(players.player[playerIndexToSend].socketId).emit("log", `playerIndexToSend: ${playerIndexToSend}`);
        socket.to(players.player[playerIndexToSend].socketId).emit("log", `data: ${data}`);
        players.player[playerIndexToSend].data = data;
    }
    static getPlayer(players, playerIndex) {
        return players.player[playerIndex];
    }
}
exports.default = SetPlayerData;
