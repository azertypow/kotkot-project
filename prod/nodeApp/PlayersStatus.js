"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _GLOBAL_1 = require("./_GLOBAL");
const PlayerAssignation_1 = require("./PlayerAssignation");
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
        const emplacements = [
            "education",
            "industrie",
            "justice",
            "information",
            "communication",
            "sante",
            "travail",
            "armee",
        ];
        if (_GLOBAL_1.default.numberOfPlayers !== roles.length) {
            console.error("le nombre de role n'est pas égale au nombre de joueur !!");
            process.exit(1);
        }
        const rolesAssigned = PlayerAssignation_1.default.generate(roles);
        console.log(roles);
        const placementAssigned = PlayerAssignation_1.default.generate(emplacements);
        console.log(placementAssigned);
        for (let j = 0; j < rolesAssigned.length; j++) {
            const currentPlayer = setPlayerData_1.default.getPlayer(players, rolesAssigned[j].playerIndex);
            currentPlayer.data = {
                action: {
                    emit: "displayMessage",
                    options: rolesAssigned[j].assignation,
                },
                emplacement: placementAssigned[j].assignation,
                nom: currentPlayer.data.nom,
                role: rolesAssigned[j].assignation,
            };
            setPlayerData_1.default.directive("brancheCasque", "", currentPlayer.id);
        }
    }
}
exports.default = PlayersStatus;
