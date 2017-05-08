/**
 * Created by azertypow on 08/05/2017.
 */

/// <reference path="../typescriptDeclaration/PlayerData.d.ts" />

import io = require("socket.io");
import Player from "./player";
import Players from "./players";

export default class SetPlayerData {
    static send(socket: SocketIO.Socket, player: Player, data: PlayerData){
        // envoyer data
        socket.emit("init", data);
        // mettre a jour les datas stocké sur le serveru
        player.data = data;
    }

    static sendTo(socket: SocketIO.Socket, players:Players, playerIdToSend: number, data: PlayerData){
        // envoyer data
        socket.to(players.player[playerIdToSend - 1].socketId).emit("init", data);
        // mettre a jour les datas stocké sur le serveru
        players.player[playerIdToSend - 1].data = data;
    }
}