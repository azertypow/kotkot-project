/**
 * Created by azertypow on 28/05/2017.
 */

import _GLOBAL from "./_GLOBAL"
import PlayerAssignation from "./PlayerAssignation"
import Player from "./player"
import Players from "./players"
import SetPlayerData from "./setPlayerData"

export default class PlayersStatus{
    static generate(players: Players, socket:SocketIO.Socket , socketId: string, socketIp: string){

        /// lister les roles
        const roles: Array<string> = [
            "Progressiste",
            "Progressiste",
            "Progressiste",
            "Humaniste",
            "Humaniste",
            "Humaniste",
            "Cyborg",
            "Cyborg",
        ];

        // liste des emplacements
        const emplacements: Array<string> = [
            "education",
            "industrie",
            "justice",
            "information",
            "communication",
            "sante",
            "travail",
            "armee",
        ];

        /// vérifier que le nombre de role soit identique au nombre de joueur
        if(_GLOBAL.numberOfPlayers !== roles.length){
            console.error("le nombre de role n'est pas égale au nombre de joueur !!");
            process.exit(1);
        }

        /// assignation des roles
        const rolesAssigned: Array<Assignation> = PlayerAssignation.generate(roles);
        console.log(roles);

        /// assignation des emplacements
        const placementAssigned: Array<Assignation> = PlayerAssignation.generate(emplacements);
        console.log(placementAssigned);

        /// envoyer les roles aux joeurs
        for(let j: number = 0; j < rolesAssigned.length; j++){

            // recupérer l'objet du joueur en cour
            const currentPlayer: Player = SetPlayerData.getPlayer(players, rolesAssigned[j].playerIndex);

            // mise a jours des datas du joueurs
            currentPlayer.data = {
                action:{
                    emit: "displayMessage",
                    options: rolesAssigned[j].assignation,
                },
                emplacement: placementAssigned[j].assignation,
                nom: currentPlayer.data.nom,
                role: rolesAssigned[j].assignation,
            };

            // envoyer la demande de mettre son casque
            SetPlayerData.directive("brancheCasque", "", currentPlayer.id);
        }
    }
}