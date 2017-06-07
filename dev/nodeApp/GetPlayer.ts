/**
 * Created by azertypow on 06/06/2017.
 */

import SocketControl from "./socketControl"
import Player from "./player"

export default class GetPlayer{

    // retrouver des joueurs avec leur role
    public static role(roleToReturn: string): Array<Player>{

        let playersToReturn: Array<Player> = [];

        for(let i: number = 0; i < SocketControl.players.player.length; i++){
            const currentPlayer = SocketControl.players.player[i];
            if(currentPlayer.data.role === roleToReturn && currentPlayer.data.emplacement !== "dead"){
                playersToReturn.push(currentPlayer);
            }
        }

        return playersToReturn;
    }
}