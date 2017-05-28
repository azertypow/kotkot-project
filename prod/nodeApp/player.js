"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(id, ipValue, socketId, data) {
        this.id = id;
        this.ipValue = ipValue;
        this.socketId = socketId;
        this.data = data;
    }
}
exports.default = Player;
