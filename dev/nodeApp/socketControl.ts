/**
 * Created by azertypow on 08/05/2017.
 */

import io = require("socket.io");
import {Server} from "http";
import Player from "./player";

interface Players {
    allIp: Array<string>;
    count: number;
    player: Array<Player>;
}

export default class SocketControl{

    static players: Players = {
        allIp: [],
        count: 0,
        player: []
    };

    public static connection(httpServer: Server){
        // socket.io
        let ioServer: SocketIO.Server = io.listen(httpServer);

        ioServer.sockets.on("connection",(socket: SocketIO.Socket)=>{
            // socket est la socket de l'utilisateur en ligne
            // tout ce qui est citué ici est donc propre a chaque connection
            let socketId = socket.id;
            let socketIp = socket.request.connection.remoteAddress;

            // personne deconnecté
            socket.on("disconnect", ()=>{
                console.log("un utilisateur s'est deconnecté");
                console.log("\n");
            });

            // control
            /// connection ok pour le control
            socket.on("control-connected", (info: Object)=>{
                // connection info
                console.log(`control ${socketId} connecté \n[ IP: ${socketIp} ]`);
                console.log(info);
                console.log("\n");
            });

            // client
            /// connection ok pour le client
            socket.on("player-connected", (info: Object)=>{
                // connection info
                console.log(`player ${socketId} connecté \n[ IP: ${socketIp} ]`);
                console.log(info);
                console.log("\n");

                // verifier que le joueur qui se connect n'ai pas deja enregistré
                function checkIp(element: string){
                    return element === socketIp;
                }

                if(! this.players.allIp.some(checkIp)){
                    // creer un Player
                    let player = new Player(socketIp);

                    // ajouter l'ip a la liste des ip
                    this.players.allIp.push(socketIp);

                    // incrémenté le nombre total de players
                    this.players.count++;

                    // ajouter a la list total de players
                    this.players.player.push(player);

                    // regarder ou en est la liste
                    console.log(this.players);
                    console.log("\n");
                }
            });
        });
    }
}