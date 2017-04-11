"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VoiceGenerator = (function () {
    function VoiceGenerator() {
    }
    VoiceGenerator.run = function () {
        var say = require('say');
        say.speak("Le jeu, démare", "Thomas");
    };
    return VoiceGenerator;
}());
exports.default = VoiceGenerator;
