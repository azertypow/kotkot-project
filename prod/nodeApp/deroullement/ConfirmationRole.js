"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setPlayerData_1 = require("../setPlayerData");
const _GLOBAL_1 = require("../_GLOBAL");
const socketControl_1 = require("../socketControl");
class ConfirmationRole {
    static run() {
        for (let i = 0; i < _GLOBAL_1.default.numberOfPlayers; i++) {
            const currentPlayer = setPlayerData_1.default.getPlayer(socketControl_1.default.players, i);
            setPlayerData_1.default.directive("displayConfirmeRole", "", currentPlayer.id);
        }
    }
}
exports.default = ConfirmationRole;
