/**
 * Created by azertypow on 06/06/2017.
 */

import SetPlayerData from "../setPlayerData"
import Player from "../player"
import SocketControl from "../socketControl"
import GetPlayer from "../GetPlayer"

export default class EnvoiDesObjectifs {
    public static run(){

        // envois aux progressistes
        const playersProgressistes: Array<Player> = GetPlayer.role("Progressiste");
        console.log("playersProgressistes");
        console.log(playersProgressistes);

        for(let i: number = 0; i < playersProgressistes.length; i++){

            // recupérer player en cour
            const currentPlayer: Player = playersProgressistes[i];

            SetPlayerData.directive("clear", "", currentPlayer.id);
            SetPlayerData.directive("play-role", "intro/narration/roles/progressiste.wav", currentPlayer.id);

            SetPlayerData.directive("log", "objet player", currentPlayer.id);
            SetPlayerData.directive("log", <any>currentPlayer, currentPlayer.id);
            SetPlayerData.directive("log", "intro/narration/roles/progressiste.wav", currentPlayer.id);
        }

        // envois aux humanistes
        const playersHumanistes: Array<Player> = GetPlayer.role("Humaniste");
        console.log("playersHumanistes");
        console.log(playersHumanistes);

        for(let i: number = 0; i < playersHumanistes.length; i++){

            // recupérer player en cour
            const currentPlayer: Player = playersHumanistes[i];

            SetPlayerData.directive("clear", "", currentPlayer.id);
            SetPlayerData.directive("play-role", "intro/narration/roles/humaniste.wav", currentPlayer.id);

            SetPlayerData.directive("log", "objet player", currentPlayer.id);
            SetPlayerData.directive("log", <any>currentPlayer, currentPlayer.id);
            SetPlayerData.directive("log", "intro/narration/roles/humaniste.wav", currentPlayer.id);
        }

        // envois aux Cyborgs
        const playersCyborgs: Array<Player> = GetPlayer.role("Cyborg");
        console.log("playersCyborgs");
        console.log(playersCyborgs);

        for(let i: number = 0; i < playersCyborgs.length; i++){

            // recupérer player en cour
            const currentPlayer: Player = playersCyborgs[i];

            SetPlayerData.directive("clear", "", currentPlayer.id);
            SetPlayerData.directive("play-role", "intro/narration/roles/cyborg.wav", currentPlayer.id);

            SetPlayerData.directive("log", "objet player", currentPlayer.id);
            SetPlayerData.directive("log", <any>currentPlayer, currentPlayer.id);
            SetPlayerData.directive("log", "intro/narration/roles/cyborg.wav", currentPlayer.id);
        }
    }
}
