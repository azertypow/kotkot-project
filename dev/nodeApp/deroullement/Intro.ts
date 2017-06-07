/**
 * Created by azertypow on 06/06/2017.
 */

import _GLOBAL from "../_GLOBAL"
import SetPlayerData from "../setPlayerData"
import Player from "../player"
import SocketControl from "../socketControl"

export default class Intro{
    public static run(){
        // lancer function arduino animationIntro

        // lancer phrases d'intro sur interphase des joueurs
        for(let i: number = 0; i < _GLOBAL.numberOfPlayers; i++){

            // recupérer player en cour
            const currentPlayer: Player = SetPlayerData.getPlayer(SocketControl.players, i);

            SetPlayerData.directive("displayMessage", {mode:"replace", message: "Bienvenue dans élise"}, currentPlayer.id);
            //SetPlayerData.directive("play-intro", "pres_intro/narration/histoire.wav", currentPlayer.id);
            // [debug]
            SetPlayerData.directive("play-intro", "dataJoueurs/liaison/est.wav", currentPlayer.id);
        }

        // envoyer a arduino
        _GLOBAL.ARDUINO.portSerial.sendDirectiveToArduino("partie intro");
    }
}