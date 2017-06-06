/**
 * Created by azertypow on 05/06/2017.
 */

/// <reference types="socket.io-client" />
/// <reference path="../typescriptDeclaration/DataFromPlayers.d.ts" />

import ReponseAuCasques from "./deroullement/ReponseAuCasques"

export default class MessagesFromPlayers{
    public static onMessageFromPlayers(socket: SocketIO.Socket){
        socket.on("finalLaw",(finalLaw: string)=>{
            console.log("loi envoyée par le déléguée");
            console.log(finalLaw);
        });

        socket.once("casque-ok", (data: DataFromPlayers)=>{
            console.log("sequence");
            console.log(data.sequence);
            console.log("value");
            console.log(data.value);
            ReponseAuCasques.onCasquePlugged();
        });
    }
}