/**
 * Created by azertypow on 08/05/2017.
 */

/// <reference types="socket.io-client" />
/// <reference path="../../typescriptDeclaration/controlTemplateMustachFormat.d.ts"/>
/// <reference path="../../typescriptDeclaration/controlTemplateMustachFormatPlayers.d.ts"/>

import LocationInfo from "../locationInfo";
import SocketEmitButton from "./socketEmitButton";
import ControlTemplate from "./controlTemplate";

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

        // initialiser template control
        let controlTemplate: ControlTemplate = new ControlTemplate(<HTMLElement>document.querySelector("#players-status"));
        console.log(controlTemplate);

        // mise a jour des données sur les joueurs afficher
        socket.on("init-control-players-status", (data: any)=>{
            console.log(data);

            let dataToSend: ControlTemplateMustachFormatPlayers = {
                players: [],
            };

            for(let key in data.player){
                const mustashPatern: ControlTemplateMustachFormat = {
                    "range": data.player[key].id + 1,
                    "ip": data.player[key].ipValue,
                    "current-rule": data.player[key].data.rules,
                };

                dataToSend.players.push(mustashPatern);
            }

            console.log(dataToSend);

            controlTemplate.render(dataToSend);
        });

        // interraction avec les boutons
        SocketEmitButton.run(socket);
    }
}