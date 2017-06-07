"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const staticServer_1 = require("./staticServer");
const socketControl_1 = require("./socketControl");
const _GLOBAL_1 = require("./_GLOBAL");
class AppServer {
    static run(port) {
        const httpServer = staticServer_1.default.run(port);
        if (_GLOBAL_1.default.debug) {
            for (let i = 0; i < _GLOBAL_1.default.numberOfPlayers - 1; i++) {
                child_process.exec("/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome\ --app=http://localhost:1337/prod/browser/players/", function (error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });
            }
        }
        socketControl_1.default.connection(httpServer);
    }
}
exports.default = AppServer;
