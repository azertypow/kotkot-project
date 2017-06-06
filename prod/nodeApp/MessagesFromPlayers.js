"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReponseAuCasques_1 = require("./deroullement/ReponseAuCasques");
class MessagesFromPlayers {
    static onMessageFromPlayers(socket) {
        socket.on("finalLaw", (finalLaw) => {
            console.log("loi envoyée par le déléguée");
            console.log(finalLaw);
        });
        socket.once("casque-ok", (data) => {
            console.log("sequence");
            console.log(data.sequence);
            console.log("value");
            console.log(data.value);
            ReponseAuCasques_1.default.onCasquePlugged();
        });
    }
}
exports.default = MessagesFromPlayers;
