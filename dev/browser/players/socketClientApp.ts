/**
 * Created by azertypow on 06/04/2017.
 */

/// <reference types="socket.io-client" />
/// <reference path="../../typescriptDeclaration/PlayerData.d.ts" />
/// <reference path="../../typescriptDeclaration/DisplayMessage_data.d.ts" />

import * as sequences from "./sequences.js"
import PlaySound from "./PlaySound"

export default class SocketClientApp {

    public static socket: SocketIOClient.Socket;

    public static run(currentHostname: string) {

        // initialiser le socket
        const socket: SocketIOClient.Socket = io.connect(`http://${currentHostname}:1337`);

        // partager le socket
        this.socket = socket;

        // enregistrer le socket pour le script js sequence.js
        sequences._global.socket = socket;

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

            // set _global sequence et emit à envoyer au server
            sequences._global.sequence = "casque";
            sequences._global.emitToServer = "casque-ok";
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
        socket.on("displayMessage", (data: DisplayMessage_data)=>{
            sequences.displayMessage(data.mode, data.message);
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

        // jouer un song
        socket.on("playSound", (soundToPlay: string)=> {
            PlaySound.playSound(soundToPlay, "standard-sound-ended");
        });

        // –––––
        // ETAPES PRECISES //
        // –––––

        // charger des sons et jouer l'intro
        socket.on("play-intro", (soundToPlay: string)=> {
            PlaySound.preloadSounds();
            PlaySound.playSound(soundToPlay, "intro-sound-ended");
        });

        // jouer l'intro-suite
        socket.on("play-intro-suite", (soundToPlay: string)=> {
            PlaySound.playSound(soundToPlay, "intro-suite-sound-ended");
        });

        // anoncer les roles a chaque joueurs
        socket.on("play-role", (soundToPlay: string)=>{
            PlaySound.playSound(soundToPlay, "play-role-ended");
        });

        // demande de confirmation des roles
        socket.on("displayConfirmeRole", ()=>{
            sequences.displayWarning("Attention, ton rôle sera affiché sur ton écran, cache-le.");

            sequences._global.emitToServer = "confirmation-role-statut";
            sequences._global.sequence = "confirmation role";
            sequences._global.message = "Excellent, on attend que tous les ministres soit prets.";

            sequences.displayButton(["autre", "j'ai compris mon role", "montre moi mon role"]);
        });

        // –––––
        // PERSO //
        // –––––

        // enregistrer role sur appareil des jouer dans _global
        socket.on("setRoleOnGlobal", (role: string)=>{
            sequences._global.role = role;
        });

        // afficher le role sur appareil
        socket.on("showRole", ()=>{
            sequences.displayMessage("replace", `tu es ${sequences._global.role}`);
            sequences.displayButton(["autre", "j'ai compris mon role"]);
        });

        // log from server
        socket.on("log", (data: any)=>{
            console.log(data);
        });
    }
}