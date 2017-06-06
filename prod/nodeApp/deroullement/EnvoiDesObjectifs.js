"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setPlayerData_1 = require("../setPlayerData");
const GetPlayer_1 = require("../GetPlayer");
class EnvoiDesObjectifs {
    static run() {
        const playersProgressistes = GetPlayer_1.default.role("Progressiste");
        console.log("playersProgressistes");
        console.log(playersProgressistes);
        for (let i = 0; i < playersProgressistes.length; i++) {
            const currentPlayer = playersProgressistes[i];
            setPlayerData_1.default.directive("clear", "", currentPlayer.id);
            setPlayerData_1.default.directive("play-role", "intro/narration/roles/progressiste.wav", currentPlayer.id);
            setPlayerData_1.default.directive("log", "objet player", currentPlayer.id);
            setPlayerData_1.default.directive("log", currentPlayer, currentPlayer.id);
            setPlayerData_1.default.directive("log", "intro/narration/roles/progressiste.wav", currentPlayer.id);
        }
        const playersHumanistes = GetPlayer_1.default.role("Humaniste");
        console.log("playersHumanistes");
        console.log(playersHumanistes);
        for (let i = 0; i < playersHumanistes.length; i++) {
            const currentPlayer = playersHumanistes[i];
            setPlayerData_1.default.directive("clear", "", currentPlayer.id);
            setPlayerData_1.default.directive("play-role", "intro/narration/roles/humaniste.wav", currentPlayer.id);
            setPlayerData_1.default.directive("log", "objet player", currentPlayer.id);
            setPlayerData_1.default.directive("log", currentPlayer, currentPlayer.id);
            setPlayerData_1.default.directive("log", "intro/narration/roles/humaniste.wav", currentPlayer.id);
        }
        const playersCyborgs = GetPlayer_1.default.role("Cyborg");
        console.log("playersCyborgs");
        console.log(playersCyborgs);
        for (let i = 0; i < playersCyborgs.length; i++) {
            const currentPlayer = playersCyborgs[i];
            setPlayerData_1.default.directive("clear", "", currentPlayer.id);
            setPlayerData_1.default.directive("play-role", "intro/narration/roles/cyborg.wav", currentPlayer.id);
            setPlayerData_1.default.directive("log", "objet player", currentPlayer.id);
            setPlayerData_1.default.directive("log", currentPlayer, currentPlayer.id);
            setPlayerData_1.default.directive("log", "intro/narration/roles/cyborg.wav", currentPlayer.id);
        }
    }
}
exports.default = EnvoiDesObjectifs;
