"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = (function () {
    function Player(id, ipValue, socketId) {
        this.id = id;
        this.ipValue = ipValue;
        this.socketId = socketId;
    }
    return Player;
}());
exports.default = Player;
