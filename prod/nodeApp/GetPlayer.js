"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketControl_1 = require("./socketControl");
class GetPlayer {
    static role(roleToReturn) {
        let playersToReturn = [];
        for (let i = 0; i < socketControl_1.default.players.player.length; i++) {
            const currentPlayer = socketControl_1.default.players.player[i];
            if (currentPlayer.data.role === roleToReturn && currentPlayer.data.emplacement !== "dead") {
                playersToReturn.push(currentPlayer);
            }
        }
        return playersToReturn;
    }
}
exports.default = GetPlayer;
