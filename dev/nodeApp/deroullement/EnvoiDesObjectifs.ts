/**
 * Created by azertypow on 06/06/2017.
 */

import SetPlayerData from "../setPlayerData"
import Player from "../player"
import GetPlayer from "../GetPlayer"

export default class EnvoiDesObjectifs {
    public static run(){

        // envois aux progressistes
        const playersProgressistes: Array<Player> = GetPlayer.role("Progressiste");

        for(let i: number = 0; i < playersProgressistes.length; i++){

            // recupérer player en cour
            const currentPlayer: Player = playersProgressistes[i];

            // effecaer interface précédente
            SetPlayerData.directive("clear", "", currentPlayer.id);

            // lancer le role en son
            SetPlayerData.directive("play-role", "intro/narration/roles/progressiste.wav", currentPlayer.id);
            // [debug]
            //SetPlayerData.directive("play-role", "dataJoueurs/liaison/est.wav", currentPlayer.id);

            // stocker le role de chacun sur son appareil dans sequence._global
            SetPlayerData.directive("setRoleOnGlobal", "Progressiste", currentPlayer.id);
        }

        // envois aux humanistes
        const playersHumanistes: Array<Player> = GetPlayer.role("Humaniste");

        for(let i: number = 0; i < playersHumanistes.length; i++){

            // recupérer player en cour
            const currentPlayer: Player = playersHumanistes[i];

            // recupérer player en cour
            SetPlayerData.directive("clear", "", currentPlayer.id);

            // effecaer interface précédente
            SetPlayerData.directive("play-role", "intro/narration/roles/humaniste.wav", currentPlayer.id);
            // [debug]
            //SetPlayerData.directive("play-role", "dataJoueurs/liaison/est.wav", currentPlayer.id);

            // stocker le role de chacun sur son appareil dans sequence._global
            SetPlayerData.directive("setRoleOnGlobal", "Humaniste", currentPlayer.id);
        }

        // envois aux Cyborgs
        const playersCyborgs: Array<Player> = GetPlayer.role("Cyborg");

        for(let i: number = 0; i < playersCyborgs.length; i++){

            // recupérer player en cour
            const currentPlayer: Player = playersCyborgs[i];

            // recupérer player en cour
            SetPlayerData.directive("clear", "", currentPlayer.id);

            // effecaer interface précédente
            SetPlayerData.directive("play-role", "intro/narration/roles/cyborg.wav", currentPlayer.id);
            // [debug]
            //SetPlayerData.directive("play-role", "dataJoueurs/liaison/est.wav", currentPlayer.id);

            // stocker le role de chacun sur son appareil dans sequence._global
            SetPlayerData.directive("setRoleOnGlobal", "Cyborg", currentPlayer.id);
        }
    }
}
