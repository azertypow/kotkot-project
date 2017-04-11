/**
 * Created by azertypow on 10/04/2017.
 */
import io = require("socket.io");
import StaticServer from "./staticServer";
import {Server} from "http";

export default class AppServer {
    static run(port: number){

        // server
        const httpServer: Server = StaticServer.run("1337");

        // socket.io
        let ioServer: SocketIO.Server = io.listen(httpServer);

        /// connection d'un user
        ioServer.sockets.on("connection",(socket: SocketIO.Socket)=>{
            // socket est la socket de l'utilisateur en ligne
            // tout ce qui est citué ici est donc propre a chaque connection
            console.log("nouvelle utilisateur connecté");

            // click sur page
            socket.on("click", (user: Object)=>{
                console.log("click");
                console.log(user);
            });
        });
    }
}

