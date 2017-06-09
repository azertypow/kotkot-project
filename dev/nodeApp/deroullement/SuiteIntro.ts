/**
 * Created by azertypow on 06/06/2017.
 */

import SetPlayerData from "../setPlayerData"
import _GLOBAL from "../_GLOBAL"
import Player from "../player"
import SocketControl from "../socketControl"

export default class SuiteIntro{
    public static run(){
        // lancer phrases d'intro sur interphase des joueurs
        for(let i: number = 0; i < _GLOBAL.numberOfPlayers; i++){

            // recupérer player en cour
            const currentPlayer: Player = SetPlayerData.getPlayer(SocketControl.players, i);

            SetPlayerData.directive("displayMessage", {mode:"add", message: "Soyez attentif !"}, currentPlayer.id);
            SetPlayerData.directive("play-intro-suite", "intro/narration/avertissement.wav", currentPlayer.id);
            // [debug]
            //SetPlayerData.directive("play-intro-suite", "dataJoueurs/liaison/est.wav", currentPlayer.id);
        }
    }
}