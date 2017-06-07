/**
 * Created by azertypow on 05/06/2017.
 */

/// <reference types="socket.io-client" />
/// <reference path="../typescriptDeclaration/DataFromPlayers.d.ts" />

import ReponseAuCasques from "./deroullement/ReponseAuCasques"
import _GLOBAL from "./_GLOBAL"
import SuiteIntro from "./deroullement/SuiteIntro"
import EnvoiDesObjectifs from "./deroullement/EnvoiDesObjectifs"
import ConfirmationRole from "./deroullement/ConfirmationRole"

export default class MessagesFromPlayers{
    public static nombreIntroJouee: number = 0;
    public static nombreIntroSuiteJouee: number = 0;
    public static numberRoleEnded: number = 0;
    public static numberRoleOk: number = 0;

    public static onMessageFromPlayers(socket: SocketIO.Socket){
        socket.on("finalLaw",(finalLaw: string)=>{
            console.log("loi envoyée par le déléguée");
            console.log(finalLaw);
        });

        socket.once("casque-ok", (data: DataFromPlayers)=>{
            console.log("sequence");
            console.log(data.sequence);
            console.log("value");
            console.log(data.value);
            ReponseAuCasques.onCasquePlugged();
        });

        // fin lecture audio intro
        socket.on("intro-sound-ended", ()=>{
            this.nombreIntroJouee++;
            console.log("intro-sound fin");

            if(this.nombreIntroJouee === _GLOBAL.numberOfPlayers){
                console.log("intro jouée partout");
                SuiteIntro.run();
            }
        });

        // fin lecture audio intro-suite
        socket.on("intro-suite-sound-ended", ()=>{
            this.nombreIntroSuiteJouee++;
            console.log("intro-suite fin");

            if(this.nombreIntroSuiteJouee === _GLOBAL.numberOfPlayers){
                console.log("intro suite jouée partout");
                EnvoiDesObjectifs.run();
            }
        });

        // fin lecture des roles
        socket.on("play-role-ended", ()=>{
            this.numberRoleEnded++;
            console.log("role fin");

            if(this.numberRoleEnded === _GLOBAL.numberOfPlayers){
                console.log("role annoncé partout");

                // envoyer bonton de confirmation role
                ConfirmationRole.run();
            }
        });

        // reception des statut de compréhension des role par chacun des joueurs
        socket.on("confirmation-role-statut", (buttonContent: any)=>{

            console.log(buttonContent);

            if(buttonContent.value === "j\'ai compris mon role"){
                console.log("role ok");
                this.numberRoleOk++;

                if(this.numberRoleOk === _GLOBAL.numberOfPlayers){
                    console.log("tous les joueurs ont compris leur role");
                }

            } else {
                console.log("role pas ok");
                socket.emit("log", "envois du role");
                socket.emit("showRole");
            }
        });

        // fin lecture audio standard
        socket.on("standard-sound-ended", ()=>{

        });
    }
}