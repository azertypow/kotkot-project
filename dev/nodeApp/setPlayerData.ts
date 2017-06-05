/**
 * Created by azertypow on 08/05/2017.
 */

/// <reference path="../typescriptDeclaration/PlayerData.d.ts" />

import io = require("socket.io")
import Player from "./player"
import Players from "./players"

export default class SetPlayerData {
    static send(socket: SocketIO.Socket, player: Player, data: PlayerData){

        // envoyer data
        socket.emit("init", data);

        // mettre a jour les datas stocké sur le serveru
        player.data = data;
    }

    static sendTo(socket: SocketIO.Socket, players:Players, playerIndexToSend: number, data: PlayerData){

        // envoyer data
        socket.to(players.player[playerIndexToSend].socketId).emit("displayEliminatedPlayer", "jorge");
        socket.to(players.player[playerIndexToSend].socketId).emit("log", `players.player[playerIndexToSend].socketId: ${players.player[playerIndexToSend].socketId}`);
        socket.to(players.player[playerIndexToSend].socketId).emit("log", `socket: ${socket}`);
        socket.to(players.player[playerIndexToSend].socketId).emit("log", `players: ${players}`);
        socket.to(players.player[playerIndexToSend].socketId).emit("log", `playerIndexToSend: ${playerIndexToSend}`);
        socket.to(players.player[playerIndexToSend].socketId).emit("log", `data: ${data}`);

        // mettre a jour les datas stocké sur le serveru
        players.player[playerIndexToSend].data = data;
    }

    static getPlayer(players: Players, playerIndex: number): Player {
        return players.player[playerIndex];
    }
}