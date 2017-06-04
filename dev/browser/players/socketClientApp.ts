/**
 * Created by azertypow on 06/04/2017.
 */

/// <reference types="socket.io-client" />
/// <reference path="../../typescriptDeclaration/PlayerData.d.ts" />

import {displayMessage} from "./sequences.js"

export default class SocketClientApp {
    public static run(currentHostname: string) {
        // initialiser le socket
        let socket: SocketIOClient.Socket = io.connect(`http://${currentHostname}:1337`);

        // envois info de connection
        socket.on("connect", ()=>{
            console.log("socket client player connected");

            socket.emit('player-connected',{
                name: "player"
            });
        });

        // initialisation status joueur
        socket.on("init", (data: PlayerData)=>{
            // afficher son status

            displayMessage("replace", `vous etes ${data.ministre}`);
        });
    }
}