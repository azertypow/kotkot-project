/**
 * Created by azertypow on 06/04/2017.
 */

/// <reference types="socket.io-client" />

import LocationInfo from "../locationInfo";
import PlayerTemplate from "./playerTemplate";

export default class SocketClientApp {
    public static run(playerTemplate: PlayerTemplate) {

        // récupérer les info sur l'url courrant
        const locationInfo: LocationInfo = new LocationInfo("window.location.href");

        // récupérer le hostname
        const currentHostname = locationInfo.parse.hostname;

        // initialiser le socket
        let socket: SocketIOClient.Socket = io.connect(`http://${currentHostname}:1337`);

        // envois info de connection
        socket.on("connect", ()=>{
            console.log("socket client player connected");

            socket.emit('player-connected',{
                name: "player"
            });
        });

        // initialisation status joueur
        socket.on("init", (data: Object)=>{
            playerTemplate.setValues(data);
        });
    }
}