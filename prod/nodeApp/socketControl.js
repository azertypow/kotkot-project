"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io");
var player_1 = require("./player");
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
            });
            socket.on("player-connected", function (info) {
                console.log("player " + socketId + " connect\u00E9 \n[ IP: " + socketIp + " ]");
                console.log(info);
                console.log("\n");
                function checkIp(element) {
                    return element === socketIp;
                }
                if (!_this.players.allIp.some(checkIp)) {
                    var player = new player_1.default(_this.players.count, socketIp, socketId);
                    _this.players.allIp.push(socketIp);
                    _this.players.count++;
                    _this.players.player.push(player);
                    console.log(_this.players);
                    console.log("\n");
                    socket.emit("init", {
                        index: _this.players.count,
                        status: "en attente de la connection de tous les joueurs",
                        rules: "les règles s'afficherons ici"
                    });
                }
                else {
                    for (var key in _this.players.player) {
                        var currentPlayer = _this.players.player[key];
                        if (currentPlayer.ipValue === socketIp) {
                            console.log("le joueur " + (currentPlayer.id + 1) + " s'est reconnect\u00E9");
                        }
                    }
                }
            });
            socket.on("control-clicked", function (data) {
                console.log(_this.players.player[0].socketId);
                socket.to(_this.players.player[0].socketId).emit("init", data);
            });
            socket.on("control-directive", function (data) {
                console.log(data);
            });
        });
    };
    return SocketControl;
}());
SocketControl.players = {
    allIp: [],
    count: 0,
    player: []
};
exports.default = SocketControl;
