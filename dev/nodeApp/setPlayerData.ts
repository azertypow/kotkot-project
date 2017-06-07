/**
 * Created by azertypow on 08/05/2017.
 */

/// <reference path="../typescriptDeclaration/PlayerData.d.ts" />
/// <reference path="../typescriptDeclaration/DisplayMessage_data.d.ts" />

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

    static directive(functionName: string, functionArguments: string | DisplayMessage_data, playerIndexToSend: number,){

        // recupérer le player en cour
        const currentPlayer: Player = socketControl.players.player[playerIndexToSend];

        // envoyer la directive au player en cour
        socketControl.ioServer.to(currentPlayer.socketId).emit(functionName, functionArguments);

        // mettre a jour les données du player
        currentPlayer.data.action = {
            options: functionArguments,
            emit: functionName,
        };

        console.log(currentPlayer);

        // console log sur interface des joueurs
        // socketControl.ioServer.to(socketControl.players.player[playerIndexToSend].socketId).emit("log", functionName);
        // socketControl.ioServer.to(socketControl.players.player[playerIndexToSend].socketId).emit("log", functionArguments);
    };
}