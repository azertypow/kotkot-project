/**
 * Created by azertypow on 28/05/2017.
 */

import _GLOBAL from "./_GLOBAL"
import AssigningRoles from "./assigningRoles"
import Player from "./player"
import Players from "./players"
import SetPlayerData from "./setPlayerData"
import Control from "./Control"

export default class PlayersStatus{
    static generate(players: Players, controller: Control, socket:SocketIO.Socket , socketId: string, socketIp: string){

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

        /// vérifier que le nombre de role soit identique au nombre de joueur
        if(_GLOBAL.numberOfPlayers !== roles.length){
            console.error("le nombre de role n'est pas égale au nombre de joueur !!");
            process.exit(1);
        }

        /// assignation des roles
        const rolesAssigned: Array<RoleAssigned> = AssigningRoles.generate(roles);
        console.log(roles);

        /// envoyer les roles aux joeurs
        for(let j: number = 0; j < rolesAssigned.length; j++){

            const currentPlayerSettings: Player = SetPlayerData.getPlayer(players, rolesAssigned[j].playerIndex);

            const dataToSend: PlayerData = {
                index: rolesAssigned[j].playerIndex,
                rules: currentPlayerSettings.data.rules,
                status: rolesAssigned[j].playerRole,
                buttons: currentPlayerSettings.data.buttons,
            };

            // regarder si les data en cour son a envoyer au socket du client actuel ou a un autre
            if( currentPlayerSettings.socketId === socketId ){
                console.log("meme socket");
                console.log(currentPlayerSettings);
                console.log(socketIp);
                // socket du joueur a metre a jour est celui sur lequel on est connecté
                const currentPlayer = players.player[j];
                SetPlayerData.send(socket, currentPlayer, dataToSend, players, controller, true);
            }
            else {
                console.log("diff");
                console.log(currentPlayerSettings);
                console.log(socketIp);
                // socket autre, on doit donner un identifiant pour envoyer les data
                SetPlayerData.sendTo(socket, players, rolesAssigned[j].playerIndex, dataToSend, controller, true);
            }
        }
    }
}