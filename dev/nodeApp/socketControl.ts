/**
 * Created by azertypow on 08/05/2017.
 */

/// <reference path="../typescriptDeclaration/PlayerData.d.ts" />
/// <reference path="../typescriptDeclaration/dataRules.d.ts"/>
/// <reference path="../typescriptDeclaration/RoleAssigned.d.ts" />

import io = require("socket.io")
import {Server} from "http"
import Player from "./player"
import Players from "./players"
import SetPlayerData from "./setPlayerData"
import Control from "./Control"
import JsonData from "../general-data/jsonData"
import _GLOBAL from "./_GLOBAL";
import PlayersStatus from "./PlayersStatus";

export default class SocketControl{

    private static ilManqueDesJoueurs: boolean = true;

    static players: Players = {
        allIp: [],
        count: 0,
        player: []
    };

    static controller: Control;

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

                // mettre a jour les information du Control controler
                this.controller = new Control(socketIp, socketId);
            });

            // client
            /// connection ok pour le client
            socket.on("player-connected", (info: Object)=>{
                // connection info
                console.log(`player ${socketId} connecté \n[ IP: ${socketIp} ]`);
                console.log(info);
                console.log("\n");

                // verifier que le joueur qui se connect n'ai pas deja enregistré que si on est pas en mode DEBUGAGE
                if(! _GLOBAL.debug){
                    function checkIp(element: string){
                        // retourne l'ip du joueur
                        return element === socketIp;
                    }

                    // la connection vient d'un nouveau joueur
                    if(! this.players.allIp.some(checkIp)){
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
                                SetPlayerData.send(socket, currentPlayer, currentPlayer.data, this.players, this.controller, true);

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

            // emit du control
            socket.on("control-directive", (data: DataRules)=> {
                const listOfPlayersToSend: Array<number> = data.selectedPlayers;

                for(let i:number = 0; i < listOfPlayersToSend.length; i++){

                    const playerToSend: number =  listOfPlayersToSend[i];
                    const player: Player = SetPlayerData.getPlayer(this.players, playerToSend );

                    let dataToSend: PlayerData = {
                        status: player.data.status,
                        rules: data.rules,
                        index: player.data.index,
                        buttons: JsonData.rulesAndButtons[data.category][data.indexCategory].buttons,
                    };

                    // SetPlayerData
                    SetPlayerData.sendTo(socket, this.players, playerToSend, dataToSend, this.controller, false);
                }
            });

            // emition d'une reponse d'un player
            socket.on("player-responses", (data: string)=>{
                socket.to(this.controller.socketId).emit("player-responses", data);
            });
        });
    }

    static createAndAssignationPlayers(socketIp: string, socketId: string, socket: SocketIO.Socket){

        // creer un Player tant qu'on est pas au nombre demandé
        if(this.ilManqueDesJoueurs){
            let player = new Player( this.players.count ,socketIp, socketId, {index: 1, rules: "empty", status: "empty", buttons: []});

            // ajouter l'ip a la liste des ip
            this.players.allIp.push(socketIp);

            // incrémenté le nombre total de players
            this.players.count++;

            // ajouter a la list total de players
            this.players.player.push(player);

            // mettre a jour l'affichage du client
            const data: PlayerData = {
                index: this.players.count,
                status: "en attente de la connection de tous les joueurs",
                rules: "les règles s'afficherons ici",
                buttons: [],
            };
            SetPlayerData.send(socket, player, data, this.players, this.controller, true);

            // regarder ou en est la liste
            console.log(this.players);
            console.log("\n");

            if(this.players.count === _GLOBAL.numberOfPlayers){
                console.log("total des joeurs connecté!\n");

                // générer les roles de chaques joueurs
                PlayersStatus.generate(this.players, this.controller, socket, socketId, socketIp);

                //enregistrer le fait que l'on ai tous les joueurs
                this.ilManqueDesJoueurs = false;
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