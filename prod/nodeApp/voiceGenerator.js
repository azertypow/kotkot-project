"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VoiceGenerator {
    static say_waitDeArduino() {
        let say = require('say');
        say.speak("Initialisation du jeu, attente de arduino", "Thomas");
    }
    static say_waitConnectionPlayers() {
        let say = require('say');
        say.speak("attente des joueurs", "Thomas");
    }
}
exports.default = VoiceGenerator;
