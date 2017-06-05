"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessagesFromPlayers {
    static onMessageFromPlayers(socket) {
        socket.on("finalLaw", (finalLaw) => {
            console.log("loi envoyée par le déléguée");
            console.log(finalLaw);
        });
    }
}
exports.default = MessagesFromPlayers;
