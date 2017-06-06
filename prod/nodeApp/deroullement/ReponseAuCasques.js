"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _GLOBAL_1 = require("../_GLOBAL");
const Intro_1 = require("./Intro");
class ReponseAuCasques {
    static onCasquePlugged() {
        this.headphonesPlugged++;
        if (this.headphonesPlugged === _GLOBAL_1.default.numberOfPlayers) {
            console.log("tous les casques sont branché!");
            Intro_1.default.run();
        }
    }
}
ReponseAuCasques.headphonesPlugged = 0;
exports.default = ReponseAuCasques;
