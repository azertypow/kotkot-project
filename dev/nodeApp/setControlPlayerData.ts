/**
 * Created by azertypow on 09/05/2017.
 */

/// <reference path="../typescriptDeclaration/PlayerData.d.ts" />

import io = require("socket.io");
import Players from "./players";
import Control from "./Control";

export default class SetControlPlayerData {
    public static send(socket: SocketIO.Socket, players:Players){
        // envoyer data
        socket.emit("init-control-players-status", players);
    }

    public static sendTo(socket: SocketIO.Socket, players:Players, controller: Control){

        if(controller !== undefined){
            // envoyer data
            socket.to(controller.socketId).emit("init-control-players-status", players);
        }
    }
}