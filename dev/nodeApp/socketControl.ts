/**
 * Created by azertypow on 08/05/2017.
 */

/// <reference path="../typescriptDeclaration/PlayerData.d.ts" />

import io = require("socket.io");
import {Server} from "http";
import Player from "./player";
import Players from "./players";
import SetPlayerData from "./setPlayerData"

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

                // la connection vient d'un nouveau joueur
                if(! this.players.allIp.some(checkIp)){
                    // creer un Player
                    let player = new Player( this.players.count ,socketIp, socketId, {index: 1, rules: "empty", status: "empty"});

                    // ajouter l'ip a la liste des ip
                    this.players.allIp.push(socketIp);

                    // incrémenté le nombre total de players
                    this.players.count++;

                    // ajouter a la list total de players
                    this.players.player.push(player);

                    // regarder ou en est la liste
                    console.log(this.players);
                    console.log("\n");

                    // mettre a jour l'affichage du client
                    const data: PlayerData = {
                        index: this.players.count,
                        status: "en attente de la connection de tous les joueurs",
                        rules: "les règles s'afficherons ici"
                    };
                    SetPlayerData.send(socket, player, data);
                }
                // la connection vient d'un joueur deja existant
                else {
                    for (let key in this.players.player){
                        const currentPlayer = this.players.player[key];
                        if( currentPlayer.ipValue === socketIp ){
                            console.log(`le joueur ${currentPlayer.id + 1} s'est reconnecté`);

                            // mettre a jour le socketId
                            currentPlayer.socketId = socketId;

                            // mettre a jour les data ecran du joueur
                            SetPlayerData.send(socket, currentPlayer, currentPlayer.data);

                            // sortir
                            break;
                        }
                    }
                }
            });

            socket.on("control-clicked", (data: PlayerData)=>{
                // SetPlayerData
                SetPlayerData.sendTo(socket, this.players, 1, data);
            });

            socket.on("control-directive", (data: Object)=>{
                console.log(data);
            });
        });
    }
}