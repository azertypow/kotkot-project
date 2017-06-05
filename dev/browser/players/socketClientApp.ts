/**
 * Created by azertypow on 06/04/2017.
 */

/// <reference types="socket.io-client" />
/// <reference path="../../typescriptDeclaration/PlayerData.d.ts" />

import * as sequences from "./sequences.js"

export default class SocketClientApp {
    public static run(currentHostname: string) {
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
        socket.on("init", (data: PlayerData)=>{
            // afficher son status
            console.log(data);
            sequences.displayMessage("replace", `vous etes ${data.action.options}`);
        });

        //——————————
        // appelle des function dans sequence depuis nodejs par socket
        //——————————

        // fonction à lancer pour que le joueur 2 puisse choisir sa loi parmi les 2 choix
        socket.on("playerTwoLawSelection", ()=>{
            sequences.playerTwoLawSelection();
        });

        // fonction à lancer pour que le joueur 1 puisse choisir ses 2 lois parmi les 3 choix
        socket.on("playerOneLawSelection", ()=>{
            sequences.playerOneLawSelection();
        });

        // fonction à lancer pour la phase d'élimination
        socket.on("elimination", ()=>{
            sequences.elimination();
        });

        // indique aux joueurs de brancher leurs casques
        socket.on("brancheCasque", ()=>{
            sequences.brancheCasque();
        });

        // indique aux joueurs d'aller s'installer à leur place
        socket.on("installation", ()=>{
            sequences.installation();
        });

        // demande aux joueurs s'ils ont compris ou pas les règles.
        socket.on("ecouteDesRegles", ()=>{
            sequences.ecouteDesRegles();
        });

        // afficher le potentiometre pour le vote
        socket.on("eliminateSomeone", (listeDesMinistresRestant: Array<string>)=>{
            sequences.eliminateSomeone(listeDesMinistresRestant);
        });

        // afficher le joueur elliminé
        socket.on("displayEliminatedPlayer", (playerData_Name: string)=>{
            sequences.displayEliminatedPlayer(playerData_Name);
        });

        socket.on("giveYourVoteToSomeone", (nombreDeJouerRestant: number)=>{
            sequences.giveYourVoteToSomeone(nombreDeJouerRestant);
        });

        // affiche les deux lois choisies par le Ministre actif sur ecran du Délégué
        socket.on("setLaws", (lawsArray: Array<string>)=>{
            sequences.setLaws(lawsArray);
        });


        // on peut soit envoyer un nom de bouton si c'est oui/non ou valider, par ex : displayButton("valider")
        // soit envoyer un tableau de boutons si on veut "oui"/"non" : displayButton(["oui", "non"])
        // soit envoyer un ou plusieurs bouton(s) personnalisé(s) (autre) : displayButton(["autre", "nom du bouton", "nom de l'autre bouton"]);
        socket.on("displayButton", (buttonToDisplay: Array<string>|string)=>{
            sequences.displayButton(buttonToDisplay);
        });

        // supprimer tous les boutons
        socket.on("removeButtons", ()=>{
            sequences.removeButtons();
        });

        // envoyer un message
        // mode-> replace | add, message -> string
        socket.on("displayMessage", (mode: string, message: string)=>{
            sequences.displayMessage(mode, message);
        });

        // supprimer le message
        socket.on("removeMessage", ()=>{
            sequences.removeMessage();
        });

        // afficher un warning
        socket.on("displayWarning", (warning: string)=>{
            sequences.displayWarning(warning);
        });

        // supprimer warning
        socket.on("removeWarning", ()=>{
            sequences.removeWarning();
        });

        // tout effecer
        socket.on("clear", ()=>{
            sequences.clear();
        });

        // log from server
        socket.on("log", (data: any)=>{
           console.log(data);
        });
    }
}