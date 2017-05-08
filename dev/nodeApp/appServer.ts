/**
 * Created by azertypow on 10/04/2017.
 */

import StaticServer from "./staticServer";
import {Server} from "http";
import SocketControl from "./socketControl";

export default class AppServer {
    static run(port: number){

        // server
        const httpServer: Server = StaticServer.run("1337");

        /// connection d'un user
        SocketControl.connection(httpServer);
    }
}

