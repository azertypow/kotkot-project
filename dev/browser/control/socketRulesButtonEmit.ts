/**
 * Created by azertypow on 10/05/2017.
 */

/// <reference types="socket.io-client" />
/// <reference path="../../typescriptDeclaration/dataRules.d.ts"/>
/// <reference types="mustache" />

import JsonData from "../../general-data/jsonData"

export default class SocketRulesButtonEmit{
    public static run(socket: SocketIOClient.Socket, selectedPlayers: Array<number>){
        // mise a jour des boutons
        let controls: string = document.querySelector("#controls").innerHTML;
        document.querySelector("#controls").innerHTML = Mustache.render(controls, JsonData.rulesAndButtons);

        // ajouter info index :
        const controlSubCategories: NodeList = document.querySelectorAll("#controls div");

        for(let i: number = 0; i < controlSubCategories.length; i++){
            const buttonChild: NodeList = (<HTMLElement>controlSubCategories[i]).querySelectorAll(".data-button");

            for(let j: number = 0; j < buttonChild.length; j++){
                (<HTMLElement>buttonChild[j]).setAttribute("data-index",j.toString());
            }
        }

        // ajouter listerner
        const buttons: NodeList = document.querySelectorAll(".data-button");
        for(let i: number = 0; i < buttons.length; i++){
            buttons[i].addEventListener("click", (e)=>{
                this.sendProposition(e, socket, selectedPlayers);
            });
        }
    }

    private static sendProposition(e: any, socket: SocketIOClient.Socket, selectedPlayers: Array<number>) {

        console.log(selectedPlayers);
        console.log(e.target);

        const data: DataRules = {
            rules: e.target.textContent,
            selectedPlayers: selectedPlayers,
            category: e.target.getAttribute("data-array"),
            indexCategory: e.target.getAttribute("data-index"),
        };

        socket.emit('control-directive', data);

    }
}