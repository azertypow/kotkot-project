/**
 * Created by azertypow on 09/04/2017.
 */

export default class VoiceGenerator {
    static say_waitDeArduino () {
        let say = require('say');
        say.speak("Initialisation du jeu, attente de arduino", "Thomas");
    }
    static say_waitConnectionPlayers(){
        let say = require('say');
        say.speak("attente des joueurs", "Thomas");
    }
}