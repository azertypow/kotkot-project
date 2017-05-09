/**
 * Created by azertypow on 08/05/2017.
 */

/// <reference types="mustache" />

import socketControlApp from "./socketControlApp";
import removeSleepMode from "../removeSleepMode";
import ManagePlayers from "./managePlayers";

let selectedPlayers: Array<number> = [];

// remove sleep mode
removeSleepMode.run();

// initialiser socket
socketControlApp.run(selectedPlayers);

// manage player
ManagePlayers.run(selectedPlayers);