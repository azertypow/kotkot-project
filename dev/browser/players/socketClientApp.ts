/**
 * Created by azertypow on 06/04/2017.
 */

/// <reference types="socket.io-client" />

import LocationInfo from "./locationInfo";

export default class SocketClientApp {
    public static run() {

        // récupérer les info sur l'url courrant
        const locationInfo: LocationInfo = new LocationInfo("window.location.href");

        // récupérer le hostname
        const currentHostname = locationInfo.parse.hostname;

        // initialiser le socket
        let socket: SocketIOClient.Socket = io.connect(`http://${currentHostname}:1337`);

        // envoyer info click au server par socket
        document.querySelector("h1").addEventListener("click", (e)=>{
            console.log("clicked");
            e.preventDefault();

            socket.emit('click',{
               username: "nom"
            });

        });
    }
}