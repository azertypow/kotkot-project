/**
 * Created by azertypow on 28/05/2017.
 */

import _GLOBAL from "./_GLOBAL"
import AssigningRoles from "./assigningRoles"
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

            // recupérer l'objet du joueur en cour
            const currentPlayer: Player = SetPlayerData.getPlayer(players, rolesAssigned[j].playerIndex);

            // préparer les data a envoyer et a mettre a jour sur le joueur en cour
            const dataToSend: PlayerData = {
                action:{
                    emit: "displayMessage",
                    options: rolesAssigned[j].playerRole,
                },
                emplacement: currentPlayer.data.emplacement,
                nom: currentPlayer.data.nom,
                role: rolesAssigned[j].playerRole,
            };

            // regarder si les data en cour son a envoyer au socket du client actuel ou a un autre
            if( currentPlayer.socketId === socketId ){
                console.log("meme socket");
                console.log(currentPlayer);
                console.log(socketIp);

                // socket du joueur a metre a jour est celui sur lequel on est connecté
                SetPlayerData.send(socket, currentPlayer, dataToSend);
            }
            else {
                console.log("diff");
                console.log(currentPlayer);
                console.log(socketIp);

                // socket autre, on doit donner un identifiant pour envoyer les data
                SetPlayerData.sendTo(socket, players, rolesAssigned[j].playerIndex, dataToSend);
            }
        }
    }
}