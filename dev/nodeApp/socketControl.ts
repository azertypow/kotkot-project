/**
 * Created by azertypow on 08/05/2017.
 */

/// <reference path="../typescriptDeclaration/PlayerData.d.ts" />
/// <reference path="../typescriptDeclaration/RoleAssigned.d.ts" />

import io = require("socket.io")
import {Server} from "http"
import Player from "./player"
import Players from "./players"
import SetPlayerData from "./setPlayerData"
import _GLOBAL from "./_GLOBAL";
import PlayersStatus from "./PlayersStatus";
import Events = require("events");

export default class SocketControl{

    private static ilManqueDesJoueurs: boolean = true;
    public static allPlayers: Events = new Events();

    static players: Players = {
        allIp: [],
        count: 0,
        player: []
    };

    // static socketId: string = "";
    // static socketIp: string = "";
    //
    // public static checkIp(element: string): boolean{
    //     // retourne l'ip du joueur
    //     return element === this.socketIp;
    // }

    public static connection(httpServer: Server){
        // socket.io
        let ioServer: SocketIO.Server = io.listen(httpServer);

        ioServer.sockets.on("connection",(socket: SocketIO.Socket)=>{

            // socket est la socket de l'utilisateur en ligne
            // tout ce qui est citué ici est donc propre a chaque connection
            const socketId = socket.id;
            const socketIp = socket.request.connection.remoteAddress;

            // personne deconnecté
            socket.on("disconnect", ()=>{
                console.log("un joueur s'est deconnecté");
                console.log("\n");
            });

            // connection ok pour le joueur
            socket.on("player-connected", (info: Object)=>{
                // connection info
                console.log(`player ${socketId} connecté \n[ IP: ${socketIp} ]`);
                console.log(info);
                console.log("\n");

                // verifier que le joueur qui se connect n'ai pas deja enregistré que si on est pas en mode DEBUGAGE
                if(! _GLOBAL.debug){

                    // la connection vient d'un nouveau joueur
                    if(! this.players.allIp.some((element)=>{return element === socketIp;})){
                        // creer les jouers et assigner les roles
                        this.createAndAssignationPlayers(socketIp, socketId, socket);
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
                }
                // mode debugage, ne pas faire de controle sur les ip des joueur
                else{
                    // creer les jouers et assigner les roles
                    this.createAndAssignationPlayers(socketIp, socketId, socket);
                }
            });
        });
    }

    static createAndAssignationPlayers(socketIp: string, socketId: string, socket: SocketIO.Socket){

        // creer un Player tant qu'on est pas au nombre demandé
        if(this.ilManqueDesJoueurs){
            const dataForPlayer: PlayerData = {
                action: {
                    emit:"displayMessage",
                    options: "en attente de la connection de tous les joueurs",
                },
                emplacement: "",
                nom: "",
                role: "",
            };
            let player = new Player( this.players.count ,socketIp, socketId, dataForPlayer);

            // ajouter l'ip a la liste des ip
            this.players.allIp.push(socketIp);

            // incrémenté le nombre total de players
            this.players.count++;

            // ajouter a la list total de players
            this.players.player.push(player);

            // mettre a jour l'affichage du player
            SetPlayerData.send(socket, player, dataForPlayer);

            // regarder ou en est la liste
            console.log(this.players);
            console.log("\n");

            if(this.players.count === _GLOBAL.numberOfPlayers){
                console.log("total des joeurs connecté!\n");

                // générer les roles de chaques joueurs
                PlayersStatus.generate(this.players, socket, socketId, socketIp);

                //enregistrer le fait que l'on ai tous les joueurs
                this.ilManqueDesJoueurs = false;

                // emetter que tous les joueurs sont connectés
                this.allPlayers.emit("connected");
            }
        }
        else{
            const dataToSend: Object = {
                //index: rolesAssigned[j].playerIndex,
                //rules: currentPlayerSettings.data.rules,
                status: "tous les joueurs sont deja connecté, tu es en trop mon lapin…",
                //buttons: currentPlayerSettings.data.buttons,
            };

            socket.emit("init", dataToSend);
        }
    }
}