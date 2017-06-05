/**
 * Created by azertypow on 05/06/2017.
 */

/// <reference types="socket.io-client" />

export default class MessagesFromPlayers{
    public static onMessageFromPlayers(socket: SocketIO.Socket){
        socket.on("finalLaw",(finalLaw: string)=>{
            console.log("loi envoyée par le déléguée");
            console.log(finalLaw);
        });
    }
}