/**
 * Created by azertypow on 08/05/2017.
 */

/// <reference path="../typescriptDeclaration/PlayerData.d.ts" />

import io = require("socket.io")
import Player from "./player"
import Players from "./players"
import socketControl from "./socketControl"

export default class SetPlayerData {
    static send(socket: SocketIO.Socket, player: Player, data: PlayerData){

        // envoyer data
        socket.emit("init", data);

        // mettre a jour les datas stocké sur le serveru
        player.data = data;
    }

    static sendTo(socket: SocketIO.Socket, players:Players, playerIndexToSend: number, data: PlayerData){

        // envoyer data
        socket.to(players.player[playerIndexToSend].socketId).emit("init", data);

        // mettre a jour les datas stocké sur le serveru
        players.player[playerIndexToSend].data = data;
    }

    static getPlayer(players: Players, playerIndex: number): Player {
        return players.player[playerIndex];
    }

    static directive(functionName: string, functionArguments: string | Object, playerIndexToSend: number,){
        socketControl.ioServer.to(socketControl.players.player[playerIndexToSend].socketId).emit(functionName, functionArguments);
        socketControl.ioServer.to(socketControl.players.player[playerIndexToSend].socketId).emit("log", functionName);
        socketControl.ioServer.to(socketControl.players.player[playerIndexToSend].socketId).emit("log", functionArguments);
    };
}