"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = (function () {
    function Player(id, ipValue, socketId, data) {
        this.id = id;
        this.ipValue = ipValue;
        this.socketId = socketId;
        this.data = data;
    }
    return Player;
}());
exports.default = Player;
