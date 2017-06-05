"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io");
const player_1 = require("./player");
const setPlayerData_1 = require("./setPlayerData");
const _GLOBAL_1 = require("./_GLOBAL");
const PlayersStatus_1 = require("./PlayersStatus");
const Events = require("events");
const MessagesFromPlayers_1 = require("./MessagesFromPlayers");
class SocketControl {
    static connection(httpServer) {
        const ioServer = io.listen(httpServer);
        this.ioServer = ioServer;
        ioServer.sockets.on("connection", (socket) => {
            this.socket = socket;
            const socketId = socket.id;
            const socketIp = socket.request.connection.remoteAddress;
            socket.on("disconnect", () => {
                console.log("un joueur s'est deconnecté");
                console.log("\n");
            });
            socket.on("player-connected", (info) => {
                console.log(`player ${socketId} connecté \n[ IP: ${socketIp} ]`);
                console.log(info);
                console.log("\n");
                if (!_GLOBAL_1.default.debug) {
                    if (!this.players.allIp.some((element) => { return element === socketIp; })) {
                        this.createAndAssignationPlayers(socketIp, socketId, socket);
                    }
                    else {
                        for (let key in this.players.player) {
                            const currentPlayer = this.players.player[key];
                            if (currentPlayer.ipValue === socketIp) {
                                console.log(`le joueur ${currentPlayer.id + 1} s'est reconnecté`);
                                currentPlayer.socketId = socketId;
                                setPlayerData_1.default.send(socket, currentPlayer, currentPlayer.data);
                                break;
                            }
                        }
                    }
                }
                else {
                    this.createAndAssignationPlayers(socketIp, socketId, socket);
                }
            });
            MessagesFromPlayers_1.default.onMessageFromPlayers(socket);
        });
    }
    static createAndAssignationPlayers(socketIp, socketId, socket) {
        if (this.ilManqueDesJoueurs) {
            const dataForPlayer = {
                action: {
                    emit: "displayMessage",
                    options: "en attente de la connection de tous les joueurs",
                },
                emplacement: "",
                nom: "",
                role: "",
            };
            let player = new player_1.default(this.players.count, socketIp, socketId, dataForPlayer);
            this.players.allIp.push(socketIp);
            this.players.count++;
            this.players.player.push(player);
            setPlayerData_1.default.send(socket, player, dataForPlayer);
            console.log(this.players);
            console.log("\n");
            if (this.players.count === _GLOBAL_1.default.numberOfPlayers) {
                console.log("total des joeurs connecté!\n");
                PlayersStatus_1.default.generate(this.players, socket, socketId, socketIp);
                this.ilManqueDesJoueurs = false;
                this.allPlayers.emit("connected");
            }
        }
        else {
            const dataToSend = {
                status: "tous les joueurs sont deja connecté, tu es en trop mon lapin…",
            };
            socket.emit("init", dataToSend);
        }
    }
}
SocketControl.ilManqueDesJoueurs = true;
SocketControl.allPlayers = new Events();
SocketControl.players = {
    allIp: [],
    count: 0,
    player: []
};
exports.default = SocketControl;
