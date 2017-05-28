"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _GLOBAL_1 = require("./_GLOBAL");
const assigningRoles_1 = require("./assigningRoles");
const setPlayerData_1 = require("./setPlayerData");
class PlayersStatus {
    static generate(players, controller, socket, socketId, socketIp) {
        const roles = [
            "membre du parti de gauche",
            "membre du parti de gauche",
            "cyborg, membre du parti de gauche",
            "membre du parti de droite",
            "membre du parti de droite",
            "cyborg, membre du parti de droite",
        ];
        if (_GLOBAL_1.default.numberOfPlayers !== roles.length) {
            console.error("le nombre de role n'est pas égale au nombre de joueur !!");
            process.exit(1);
        }
        const rolesAssigned = assigningRoles_1.default.generate(roles);
        console.log(roles);
        for (let j = 0; j < rolesAssigned.length; j++) {
            const currentPlayerSettings = setPlayerData_1.default.getPlayer(players, rolesAssigned[j].playerIndex);
            const dataToSend = {
                index: rolesAssigned[j].playerIndex,
                rules: currentPlayerSettings.data.rules,
                status: rolesAssigned[j].playerRole,
                buttons: currentPlayerSettings.data.buttons,
            };
            if (currentPlayerSettings.socketId === socketId) {
                console.log("meme socket");
                console.log(currentPlayerSettings);
                console.log(socketIp);
                const currentPlayer = players.player[j];
                setPlayerData_1.default.send(socket, currentPlayer, dataToSend, players, controller, true);
            }
            else {
                console.log("diff");
                console.log(currentPlayerSettings);
                console.log(socketIp);
                setPlayerData_1.default.sendTo(socket, players, rolesAssigned[j].playerIndex, dataToSend, controller, true);
            }
        }
    }
}
exports.default = PlayersStatus;
