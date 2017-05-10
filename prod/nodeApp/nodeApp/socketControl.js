"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io");
var assigningRoles_1 = require("./assigningRoles");
var player_1 = require("./player");
var setPlayerData_1 = require("./setPlayerData");
var Control_1 = require("./Control");
var jsonData_1 = require("../general-data/jsonData");
var SocketControl = (function () {
    function SocketControl() {
    }
    SocketControl.connection = function (httpServer) {
        var _this = this;
        var ioServer = io.listen(httpServer);
        ioServer.sockets.on("connection", function (socket) {
            var socketId = socket.id;
            var socketIp = socket.request.connection.remoteAddress;
            socket.on("disconnect", function () {
                console.log("un utilisateur s'est deconnecté");
                console.log("\n");
            });
            socket.on("control-connected", function (info) {
                console.log("control " + socketId + " connect\u00E9 \n[ IP: " + socketIp + " ]");
                console.log(info);
                console.log("\n");
                _this.controller = new Control_1.default(socketIp, socketId);
            });
            socket.on("player-connected", function (info) {
                console.log("player " + socketId + " connect\u00E9 \n[ IP: " + socketIp + " ]");
                console.log(info);
                console.log("\n");
                function checkIp(element) {
                    return element === socketIp;
                }
                if (!_this.players.allIp.some(checkIp)) {
                    if (_this.ilManqueDesJoueurs) {
                        var player = new player_1.default(_this.players.count, socketIp, socketId, { index: 1, rules: "empty", status: "empty", buttons: [] });
                        _this.players.allIp.push(socketIp);
                        _this.players.count++;
                        _this.players.player.push(player);
                        var data = {
                            index: _this.players.count,
                            status: "en attente de la connection de tous les joueurs",
                            rules: "les règles s'afficherons ici",
                            buttons: [],
                        };
                        setPlayerData_1.default.send(socket, player, data, _this.players, _this.controller, true);
                        console.log(_this.players);
                        console.log("\n");
                        if (_this.players.count === _this.numberOfPlayers) {
                            console.log("total des joeurs connecté!\n");
                            var roles = [
                                "membre du parti de gauche",
                                "membre du parti de gauche",
                                "cyborg, membre du parti de gauche",
                                "membre du parti de droite",
                                "membre du parti de droite",
                                "cyborg, membre du parti de droite",
                            ];
                            if (_this.numberOfPlayers !== roles.length) {
                                console.error("le nombre de role n'est pas égale au nombre de joueur !!");
                                process.exit(1);
                            }
                            var rolesAssigned = assigningRoles_1.default.generate(roles);
                            console.log(roles);
                            for (var j = 0; j < rolesAssigned.length; j++) {
                                var currentPlayerSettings = setPlayerData_1.default.getPlayer(_this.players, rolesAssigned[j].playerIndex);
                                var dataToSend = {
                                    index: rolesAssigned[j].playerIndex,
                                    rules: currentPlayerSettings.data.rules,
                                    status: rolesAssigned[j].playerRole,
                                    buttons: currentPlayerSettings.data.buttons,
                                };
                                if (currentPlayerSettings.socketId === socketId) {
                                    console.log("meme socket");
                                    console.log(currentPlayerSettings);
                                    console.log(socketIp);
                                    var currentPlayer = _this.players.player[j];
                                    setPlayerData_1.default.send(socket, currentPlayer, dataToSend, _this.players, _this.controller, true);
                                }
                                else {
                                    console.log("diff");
                                    console.log(currentPlayerSettings);
                                    console.log(socketIp);
                                    setPlayerData_1.default.sendTo(socket, _this.players, rolesAssigned[j].playerIndex, dataToSend, _this.controller, true);
                                }
                            }
                            _this.ilManqueDesJoueurs = false;
                        }
                    }
                }
                else {
                    for (var key in _this.players.player) {
                        var currentPlayer = _this.players.player[key];
                        if (currentPlayer.ipValue === socketIp) {
                            console.log("le joueur " + (currentPlayer.id + 1) + " s'est reconnect\u00E9");
                            currentPlayer.socketId = socketId;
                            setPlayerData_1.default.send(socket, currentPlayer, currentPlayer.data, _this.players, _this.controller, true);
                            break;
                        }
                    }
                }
            });
            socket.on("control-directive", function (data) {
                var listOfPlayersToSend = data.selectedPlayers;
                for (var i = 0; i < listOfPlayersToSend.length; i++) {
                    var playerToSend = listOfPlayersToSend[i];
                    var player = setPlayerData_1.default.getPlayer(_this.players, playerToSend);
                    var dataToSend = {
                        status: player.data.status,
                        rules: data.rules,
                        index: player.data.index,
                        buttons: jsonData_1.default.rulesAndButtons[data.category][data.indexCategory].buttons,
                    };
                    setPlayerData_1.default.sendTo(socket, _this.players, playerToSend, dataToSend, _this.controller, false);
                }
            });
            socket.on("player-responses", function (data) {
                socket.to(_this.controller.socketId).emit("player-responses", data);
            });
        });
    };
    return SocketControl;
}());
SocketControl.numberOfPlayers = 6;
SocketControl.ilManqueDesJoueurs = true;
SocketControl.players = {
    allIp: [],
    count: 0,
    player: []
};
exports.default = SocketControl;
