/**
 * Created by azertypow on 09/04/2017.
 */

export default class VoiceGenerator {
    static run () {
        let say = require('say');
        say.speak("Le jeu, démare", "Thomas");
    }
}