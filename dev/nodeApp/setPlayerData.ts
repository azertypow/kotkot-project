/**
 * Created by azertypow on 08/05/2017.
 */

/// <reference path="../typescriptDeclaration/PlayerData.d.ts" />

import io = require("socket.io")
import Player from "./player"
import Players from "./players"
import SetControlPlayerData from "./setControlPlayerData"
import Control from "./Control";

export default class SetPlayerData {
    static send(socket: SocketIO.Socket, player: Player, data: PlayerData, players:Players, controller: Control, forceSendTo: boolean ){

        // envoyer data
        socket.emit("init", data);

        // mettre a jour les datas stocké sur le serveru
        player.data = data;

        // mettre a jour les données sur le controler
        if(forceSendTo){
            // le socket NE vient PAS du controler
            SetControlPlayerData.sendTo(socket, players, controller);
        }
        else{
            // le socket vient du controler (control emet)
            SetControlPlayerData.send(socket, players);
        }
    }

    static sendTo(socket: SocketIO.Socket, players:Players, playerIndexToSend: number, data: PlayerData, controller: Control, forceSendTo: boolean ){

        // envoyer data
        socket.to(players.player[playerIndexToSend - 1].socketId).emit("init", data);

        // mettre a jour les datas stocké sur le serveru
        players.player[playerIndexToSend - 1].data = data;

        // mettre a jour les données sur le controler
        if(forceSendTo){
            // le socket NE vient PAS du controler
            SetControlPlayerData.sendTo(socket, players, controller);
        }
        else{
            // le socket vient du controler (control emet)
            SetControlPlayerData.send(socket, players);
        }
    }

    static getPlayer(players: Players, playerIndex: number): Player {
        return players.player[playerIndex - 1];
    }
}