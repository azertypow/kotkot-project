"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const staticServer_1 = require("./staticServer");
const socketControl_1 = require("./socketControl");
class AppServer {
    static run(port) {
        const httpServer = staticServer_1.default.run("1337");
        socketControl_1.default.connection(httpServer);
    }
}
exports.default = AppServer;
