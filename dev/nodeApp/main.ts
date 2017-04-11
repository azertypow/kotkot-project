/**
 * Created by azertypow on 09/04/2017.
 */

import VoiceGenerator from "./voiceGenerator.js"
import AppServer from "./appServer"

// voie
VoiceGenerator.run();

// socket
AppServer.run(1337);