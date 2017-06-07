"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setPlayerData_1 = require("../setPlayerData");
const GetPlayer_1 = require("../GetPlayer");
class EnvoiDesObjectifs {
    static run() {
        const playersProgressistes = GetPlayer_1.default.role("Progressiste");
        for (let i = 0; i < playersProgressistes.length; i++) {
            const currentPlayer = playersProgressistes[i];
            setPlayerData_1.default.directive("clear", "", currentPlayer.id);
            setPlayerData_1.default.directive("play-role", "dataJoueurs/liaison/est.wav", currentPlayer.id);
            setPlayerData_1.default.directive("setRoleOnGlobal", "Progressiste", currentPlayer.id);
        }
        const playersHumanistes = GetPlayer_1.default.role("Humaniste");
        for (let i = 0; i < playersHumanistes.length; i++) {
            const currentPlayer = playersHumanistes[i];
            setPlayerData_1.default.directive("clear", "", currentPlayer.id);
            setPlayerData_1.default.directive("play-role", "dataJoueurs/liaison/est.wav", currentPlayer.id);
            setPlayerData_1.default.directive("setRoleOnGlobal", "Humaniste", currentPlayer.id);
        }
        const playersCyborgs = GetPlayer_1.default.role("Cyborg");
        for (let i = 0; i < playersCyborgs.length; i++) {
            const currentPlayer = playersCyborgs[i];
            setPlayerData_1.default.directive("clear", "", currentPlayer.id);
            setPlayerData_1.default.directive("play-role", "dataJoueurs/liaison/est.wav", currentPlayer.id);
            setPlayerData_1.default.directive("setRoleOnGlobal", "Cyborg", currentPlayer.id);
        }
    }
}
exports.default = EnvoiDesObjectifs;
