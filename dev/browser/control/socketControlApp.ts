/**
 * Created by azertypow on 08/05/2017.
 */

/// <reference types="socket.io-client" />

import LocationInfo from "../locationInfo";
import SocketEmitButton from "./socketEmitButton";

export default class socketControlApp {
    public static run(){

        // récupérer les info sur l'url courrant
        const locationInfo: LocationInfo = new LocationInfo("window.location.href");

        // récupérer le hostname
        const currentHostname = locationInfo.parse.hostname;

        // initialiser le socket
        let socket: SocketIOClient.Socket = io.connect(`http://${currentHostname}:1337`);

        // envois info de connection
        socket.on("connect", ()=>{
            console.log("socket control connected");

            socket.emit('control-connected',{
                name: "control"
            });
        });

        document.querySelector(".rul").addEventListener("click", ()=>{

            console.log("click");

            socket.emit("control-clicked", {
                index:1,
                rules:"ok",
                status: "haha"
            });
        });

        // interraction avec les boutons
        SocketEmitButton.run(socket);
    }
}