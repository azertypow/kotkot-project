"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SetControlPlayerData {
    static send(socket, players) {
        socket.emit("init-control-players-status", players);
    }
    static sendTo(socket, players, controller) {
        if (controller !== undefined) {
            socket.to(controller.socketId).emit("init-control-players-status", players);
        }
    }
}
exports.default = SetControlPlayerData;
