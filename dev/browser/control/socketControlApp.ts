/**
 * Created by azertypow on 08/05/2017.
 */

/// <reference types="socket.io-client" />
/// <reference path="../../typescriptDeclaration/controlTemplateMustachFormat.d.ts"/>
/// <reference path="../../typescriptDeclaration/controlTemplateMustachFormatPlayers.d.ts"/>

import SocketRulesButtonEmit from "./socketRulesButtonEmit"
import ControlTemplate from "./controlTemplate";
import Players from "../../nodeApp/players";

export default class socketControlApp {
    public static run(selectedPlayers: Array<number>, currentHostname: string){
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
        socket.on("init-control-players-status", (data: Players)=>{
            console.log(data);

            let dataToSend: ControlTemplateMustachFormatPlayers = {
                players: [],
            };

            for(let key in data.player){
                const mustashPatern: ControlTemplateMustachFormat = {
                    "range": data.player[key].data.index,
                    "ip": data.player[key].ipValue,
                    "current-rule": data.player[key].data.rules,
                    "status": data.player[key].data.status,
                };

                dataToSend.players.push(mustashPatern);
            }

            console.log(dataToSend);

            controlTemplate.render(dataToSend);
        });

        // interraction avec les boutons
        // SocketEmitButton.run(socket, selectedPlayers);
        SocketRulesButtonEmit.run(socket, selectedPlayers);

        // a la reception de reponse boutton
        socket.on("player-responses", (data: string)=>{
            document.querySelector(".user-response").innerHTML = data;
        });

    }
}