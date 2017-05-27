"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VoiceGenerator {
    static run() {
        let say = require('say');
        say.speak("Le jeu, démare", "Thomas");
    }
}
exports.default = VoiceGenerator;
