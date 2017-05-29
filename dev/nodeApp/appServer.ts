/**
 * Created by azertypow on 10/04/2017.
 */

import child_process = require("child_process")
import StaticServer from "./staticServer";
import {Server} from "http";
import SocketControl from "./socketControl";
import _GLOBAL from "./_GLOBAL";

export default class AppServer {
    static run(port: number){

        // server
        const httpServer: Server = StaticServer.run("1337");

        // ouvrire les fenetre de simulation si on est en mode debugage
        if(_GLOBAL.debug){
            for(let i: number = 0; i < _GLOBAL.numberOfPlayers - 1; i++){
                // ouvrire les simulation d'app
                child_process.exec("/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome\ --app=http://localhost:1337/prod/browser/players", function(error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });
            }
        }

        /// connection d'un user
        SocketControl.connection(httpServer);
    }
}

