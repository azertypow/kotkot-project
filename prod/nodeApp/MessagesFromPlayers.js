"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReponseAuCasques_1 = require("./deroullement/ReponseAuCasques");
const _GLOBAL_1 = require("./_GLOBAL");
const SuiteIntro_1 = require("./deroullement/SuiteIntro");
const EnvoiDesObjectifs_1 = require("./deroullement/EnvoiDesObjectifs");
class MessagesFromPlayers {
    static onMessageFromPlayers(socket) {
        socket.on("finalLaw", (finalLaw) => {
            console.log("loi envoyée par le déléguée");
            console.log(finalLaw);
        });
        socket.once("casque-ok", (data) => {
            console.log("sequence");
            console.log(data.sequence);
            console.log("value");
            console.log(data.value);
            ReponseAuCasques_1.default.onCasquePlugged();
        });
        socket.on("intro-sound-ended", () => {
            this.nombreIntroJouee++;
            console.log("intro-sound fin");
            if (this.nombreIntroJouee === _GLOBAL_1.default.numberOfPlayers) {
                console.log("intro jouée partout");
                SuiteIntro_1.default.run();
            }
        });
        socket.on("intro-suite-sound-ended", () => {
            this.nombreIntroSuiteJouee++;
            console.log("intro-suite fin");
            if (this.nombreIntroSuiteJouee === _GLOBAL_1.default.numberOfPlayers) {
                console.log("intro suite jouée partout");
                EnvoiDesObjectifs_1.default.run();
            }
        });
        socket.on("play-role-ended", () => {
            this.numberRoleEnded++;
            console.log("role fin");
            if (this.numberRoleEnded === _GLOBAL_1.default.numberOfPlayers) {
                console.log("role annoncé partout");
            }
        });
        socket.on("standard-sound-ended", () => {
        });
    }
}
MessagesFromPlayers.nombreIntroJouee = 0;
MessagesFromPlayers.nombreIntroSuiteJouee = 0;
MessagesFromPlayers.numberRoleEnded = 0;
exports.default = MessagesFromPlayers;
