/**
 * Created by azertypow on 06/06/2017.
 */


import SetPlayerData from "../setPlayerData"
import Player from "../player"
import _GLOBAL from "../_GLOBAL"
import SocketControl from "../socketControl"
import GetPlayer from "../GetPlayer"

export default class ConfirmationRole{
    public static run(){
        for(let i: number = 0; i < _GLOBAL.numberOfPlayers; i++){

            // recupérer player en cour
            const currentPlayer: Player = SetPlayerData.getPlayer(SocketControl.players, i);

            SetPlayerData.directive("displayConfirmeRole", "", currentPlayer.id);
        }
    }
}