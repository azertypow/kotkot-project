"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _GLOBAL_1 = require("./_GLOBAL");
const assigningRoles_1 = require("./assigningRoles");
const setPlayerData_1 = require("./setPlayerData");
class PlayersStatus {
    static generate(players, socket, socketId, socketIp) {
        const roles = [
            "Progressiste",
            "Progressiste",
            "Progressiste",
            "Humaniste",
            "Humaniste",
            "Humaniste",
            "Cyborg",
            "Cyborg",
        ];
        if (_GLOBAL_1.default.numberOfPlayers !== roles.length) {
            console.error("le nombre de role n'est pas égale au nombre de joueur !!");
            process.exit(1);
        }
        const rolesAssigned = assigningRoles_1.default.generate(roles);
        console.log(roles);
        for (let j = 0; j < rolesAssigned.length; j++) {
            const currentPlayer = setPlayerData_1.default.getPlayer(players, rolesAssigned[j].playerIndex);
            const dataToSend = {
                action: {
                    emit: "displayMessage",
                    options: rolesAssigned[j].playerRole,
                },
                emplacement: currentPlayer.data.emplacement,
                nom: currentPlayer.data.nom,
                role: rolesAssigned[j].playerRole,
            };
            if (currentPlayer.socketId === socketId) {
                console.log("meme socket");
                console.log(currentPlayer);
                console.log(socketIp);
                setPlayerData_1.default.send(socket, currentPlayer, dataToSend);
            }
            else {
                console.log("diff");
                console.log(currentPlayer);
                console.log(socketIp);
                setPlayerData_1.default.sendTo(socket, players, rolesAssigned[j].playerIndex, dataToSend);
            }
        }
    }
}
exports.default = PlayersStatus;
