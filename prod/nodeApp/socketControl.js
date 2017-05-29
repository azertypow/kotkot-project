"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io");
const player_1 = require("./player");
const setPlayerData_1 = require("./setPlayerData");
const Control_1 = require("./Control");
const jsonData_1 = require("../general-data/jsonData");
const _GLOBAL_1 = require("./_GLOBAL");
const PlayersStatus_1 = require("./PlayersStatus");
const Events = require("events");
class SocketControl {
    static connection(httpServer) {
        let ioServer = io.listen(httpServer);
        ioServer.sockets.on("connection", (socket) => {
            let socketId = socket.id;
            let socketIp = socket.request.connection.remoteAddress;
            socket.on("disconnect", () => {
                console.log("un utilisateur s'est deconnecté");
                console.log("\n");
            });
            socket.on("control-connected", (info) => {
                console.log(`control ${socketId} connecté \n[ IP: ${socketIp} ]`);
                console.log(info);
                console.log("\n");
                this.controller = new Control_1.default(socketIp, socketId);
            });
            socket.on("player-connected", (info) => {
                console.log(`player ${socketId} connecté \n[ IP: ${socketIp} ]`);
                console.log(info);
                console.log("\n");
                if (!_GLOBAL_1.default.debug) {
                    function checkIp(element) {
                        return element === socketIp;
                    }
                    if (!this.players.allIp.some(checkIp)) {
                        this.createAndAssignationPlayers(socketIp, socketId, socket);
                    }
                    else {
                        for (let key in this.players.player) {
                            const currentPlayer = this.players.player[key];
                            if (currentPlayer.ipValue === socketIp) {
                                console.log(`le joueur ${currentPlayer.id + 1} s'est reconnecté`);
                                currentPlayer.socketId = socketId;
                                setPlayerData_1.default.send(socket, currentPlayer, currentPlayer.data, this.players, this.controller, true);
                                break;
                            }
                        }
                    }
                }
                else {
                    this.createAndAssignationPlayers(socketIp, socketId, socket);
                }
            });
            socket.on("control-directive", (data) => {
                const listOfPlayersToSend = data.selectedPlayers;
                for (let i = 0; i < listOfPlayersToSend.length; i++) {
                    const playerToSend = listOfPlayersToSend[i];
                    const player = setPlayerData_1.default.getPlayer(this.players, playerToSend);
                    let dataToSend = {
                        status: player.data.status,
                        rules: data.rules,
                        index: player.data.index,
                        buttons: jsonData_1.default.rulesAndButtons[data.category][data.indexCategory].buttons,
                    };
                    setPlayerData_1.default.sendTo(socket, this.players, playerToSend, dataToSend, this.controller, false);
                }
            });
            socket.on("player-responses", (data) => {
                socket.to(this.controller.socketId).emit("player-responses", data);
            });
        });
    }
    static createAndAssignationPlayers(socketIp, socketId, socket) {
        if (this.ilManqueDesJoueurs) {
            let player = new player_1.default(this.players.count, socketIp, socketId, { index: 1, rules: "empty", status: "empty", buttons: [] });
            this.players.allIp.push(socketIp);
            this.players.count++;
            this.players.player.push(player);
            const data = {
                index: this.players.count,
                status: "en attente de la connection de tous les joueurs",
                rules: "les règles s'afficherons ici",
                buttons: [],
            };
            setPlayerData_1.default.send(socket, player, data, this.players, this.controller, true);
            console.log(this.players);
            console.log("\n");
            if (this.players.count === _GLOBAL_1.default.numberOfPlayers) {
                console.log("total des joeurs connecté!\n");
                this.allPlayers.emit("connected");
                PlayersStatus_1.default.generate(this.players, this.controller, socket, socketId, socketIp);
                this.ilManqueDesJoueurs = false;
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
