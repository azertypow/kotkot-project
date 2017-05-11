/**
 * Created by azertypow on 06/04/2017.
 */

/// <reference types="socket.io-client" />
/// <reference path="../../typescriptDeclaration/Player_template_dataToSend.d.ts" />

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
        socket.on("init", (data: Player_template_dataToSend)=>{
            playerTemplate.setValues(data);

            // event sur les boutons
            const allButtons: NodeListOf<Element> = document.querySelectorAll(".buttons button");

            for(let i: number = 0; i<allButtons.length; i++){
                (<HTMLElement>allButtons[i]).addEventListener("click", (e)=>{
                    socket.emit("player-responses", (<HTMLElement>e.target).innerHTML);

                    for(let j: number = 0; j<allButtons.length; j++){
                        (<HTMLElement>allButtons[j]).style.display = "none";
                    }
                });
            }
        });
    }
}