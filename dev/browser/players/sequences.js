/**
 * Created by mathi on 03/06/2017.
 */

// Ce sont les morceaux de code qui sont appelés pendant le déroulement du jeu qui se passe dans script.js

function Global(socket, sequence, callpackServer, role, message) {
    this.socket = socket;
    this.sequence = sequence;
    this.emitToServer = callpackServer;
    this.role = role;
    this.message = message;
}

export var _global = new Global("empty", "empty", "empty", "empty", "bien recu");

// fonction à lancer pour démarrer une phase de vote des lois
// node server
export function startVote() {

    clear();
    background([0,0,255]);
    displayTitle("Votation");

    setTimeout(function() {
        if (premierTour) {
            choisiDeuxMinistres(listeDesMinistresRestant);
            // ici il faudrait lancer le son d'explication du vote
            premierTour = false;
        } else {
            choisiDelegue(listeDesMinistresRestant);
            var ministreActif = "Ministre du Travail";
            var joueur = "autre"; // joueur === "autre" || "ministreActif" || "delegue"
            voteDeConfiance(joueur, ministreActif);
        }
        // voteDeConfiance(listeDesMinistresRestant);
    }, titleDuration);


}


// sauf au premier tour - choisi au hasard le délégué
// node server
export function choisiDelegue(ministres) {



    // on tire un nombre au hasard pour choisir le délégué
    var index = Math.floor(Math.random()*ministres.length);
    var delegue = ministres[index];

    console.log("delegue " + delegue);

    // return delegue;
}

// si on est au premier tour, choisi les deux ministres qui seronts respectivement
// ministre actif et délégué
// node server
export function choisiDeuxMinistres(ministresRestants) {

    // on crée une liste temporaire pour pouvoir en retirer le ministre actif
    // la fonction concat permet d'assembler deux tableaux en un nouveau
    var temp = [];
    var ministresRestantsTemporaires = listeDesMinistresRestant.concat(temp);


    // on tire un nombre au hasard pour choisir le ministre actif
    var index = Math.floor(Math.random()*ministresRestantsTemporaires.length);
    var ministreActif = ministresRestants[index];

    // on enlève le ministre actif du tableau temporaire des ministres restants
    var ministreARetirer = ministresRestantsTemporaires.indexOf(ministreActif);
    ministresRestantsTemporaires.splice(ministreARetirer, 1);
    // on tire un nombre au hasard pour choisir le délégué
    index = Math.floor(Math.random()*ministresRestantsTemporaires.length);
    var delegue = ministresRestantsTemporaires[index];


    console.log("ministre actif " + ministreActif);
    console.log("delegue " + delegue);
}

// lance le vote de confiance sur le ministre actif choisi par le précédent délégué
export function voteDeConfiance(joueur, ministreActif) {

    title.textContent = "";

    if (joueur === "autre") {
        displayMessage("replace", messages.voteConfiance.init["autres1"]);
        displayButton(['oui', 'non']);
    } else if (joueur === "ministreActif" || joueur === "delegue") {
        displayMessage("replace", messages.voteConfiance.init["ministre+delegue"]);
    } else {
        console.log("Erreur : la variable 'joueur' ne correspond à aucune des valeurs attendues ('autre', 'ministreActif', 'delegue'");
    }

}

// après avoir lancé le vote de confiance on reçoit un ensemble de "oui" ou "non" de la part des joueurs
// la fonction permet de délibérer si on garde ce ministre actif ou pas
export function deliberationVoteConfiance(reponsesDesJoueurs) {

    //reponsesDesJoueurs est de type
    //  reponsesDesJoueurs = {
    //     "Ministre de l'Education":"oui",
    //     "Ministre de l'Industrie":"oui",
    //     "Ministre de la Justice":"non",
    //     "Ministre de l'Information":"oui",
    //     ...
    //  }

    var oui = 0;
    var non = 0;
    var nbReponses = 0;
    var ministres = [];

    // on compte le nombre de votes
    for (var i in reponsesDesJoueurs) {
        if(reponsesDesJoueurs.hasOwnProperty(i)){
            ministres.push(i);
            nbReponses++;
        }
    }

    // on compatibilise le nombre de oui et de non
    for (var i=0; i<nbReponses; i++) {
        if (reponsesDesJoueurs[ministres[i]] === "oui") {
            oui++;
        } else {
            non++;
        }
    }

    if (oui > non) {
        displayMessage("replace", messages.voteConfiance.resultat.majoriteoui);
    } else {
        //playSound("Vous avez rejeté le <joueur>. Un nouveau délégué va être désigné")

        // on affiche d'abord un message comme quoi le vote de confiance a échoué
        displayMessage("replace", messages.voteConfiance.resultat.majoritenon);
        setTimeout(function() {

            // puis on affiche une animation des noms de joueurs à la suite pour montrer qu'il y a un tirage au sort
            var animHasard = setInterval(function() {
                var index = Math.floor(Math.random()*listeDesMinistresRestant.length);
                var message = listeDesMinistresRestant[index];
                displayMessage("replace", message);
            }, 70);

            // enfin on affiche un joueur désigné au hasard par la machine
            setTimeout(function(){
                clearInterval(animHasard);
                var index = Math.floor(Math.random()*ministres.length);
                displayMessage("replace", ministres[index] + " " + messages.voteConfiance.resultat.nouveauchoix);
                console.log("le nouveau ministre actif est " + ministres[index]);
            },4000);
        }, 2000);

    }

}




// fonction à lancer pour que le Délégué puisse choisir sa loi parmi les 2 choix
export function playerTwoLawSelection() {

    clear();

    background([0,0,255]);
    createLaws(2);
    setLaws(lawsArray);
    document.querySelector('.valider').addEventListener('click', function(e, socket){
        displayFinalLaw(e, socket);
    });

}

// fonction à lancer pour que le joueur 1 puisse choisir ses 2 lois parmi les 3 choix
export function playerOneLawSelection() {

    clear();

    background([0,0,255]);

    // afficher le message d'action a faire
    displayMessage(messages.tireTroisLois);
    createLaws(3);

    // Ajoute les listeners
    setTimeout(function() {generateLaw(0);}, 1000);
    setTimeout(function() {generateLaw(1);}, 1200);
    setTimeout(function() {generateLaw(2);}, 1400);

    // event listener pour envoyer le choix du DÉLÉGUÉ parmis les 2 cartes
    document.querySelector('.valider').addEventListener('click', sendChoicesToPlayerTwo);

}

// fonction à lancer pour la phase d'élimination
export function elimination() {

    clear();

    background([255,0,0]);
    displayTitle("Élimination");

    setTimeout(function() {
        if (premierTour) {
            title.textContent = "";
            displayMessage("replace", messages.elimination["premier tour"]);
            displayButton(["oui", "non"]);
            document.querySelector('.doublechoix').style.top = "60%"; // on modifie légèrement la marge comme le message est long
        } else {
            displayMessage("replace", messages.elimination.init);
            displayButton(["oui", "non"]);
        }
    }, titleDuration);

    setTimeout(function() {
        eliminateSomeone(listeDesMinistresRestant);
    }, 3000);



}





/***************
 *
 *   Introduction
 *
 ***************/

// indique aux joueurs de brancher leurs casques
export function brancheCasque() {

    clear();
    background([0,0,0]);
    displayMessage("replace", "Est-ce que ton casque est bien branché ?");
    displayButton("oui", ()=>{
        var returnMessage = function () {
            console.log("coucou");
            displayMessage("replace", "Merci.<br>Votre assignation ministairielle va vous être envoyée.");
            document.querySelector(".oui").removeEventListener("click", returnMessage);
        };
        document.querySelector(".oui").addEventListener("click", returnMessage);
    });

}

// indique aux joueurs d'aller s'installer à leur place
export function installation() {

    clear();
    background([0,0,0]);

    displayMessage("replace", "Tu es Ministre de l'Education. Tu peux aller t'installer à ta place");
    displayButton(["autre", "Je suis assis à ma place"]);

    // si les joueurs mettent trop de temps à se connecter.
    setTimeout(function () {
        displayMessage("add", "Dis-leur de se dépêcher, on a pas toute la nuit");
    }, 10000);
}

// demande aux joueurs s'ils ont compris ou pas les règles.
export function ecouteDesRegles() {

    clear();
    background([0,0,0]);
    displayButton(["autre", "J'ai compris les règles", "Je souhaite les réécouter"]);
    // displayButton(["autre", "Je souhaite les réécouter"]);

}




/***************
 *
 *   Fonctions pour le système d'élimination
 *
 ***************/

// afficher le potentiometre pour le vote
export function eliminateSomeone(listeDesMinistresRestant) {

    clear();

    displayMessage("replace", messages.elimination.choisi);
    displayButton("valider");

    document.querySelector('.potentiometer').style.display = "block";
    placeCursorBeginning();
    document.body.addEventListener('touchmove', function(e){
        var playerToEliminate = moveCursor(e, listeDesMinistresRestant);
        console.log("player " + playerToEliminate);
        document.querySelector('.valider').addEventListener('click', displayEliminatedPlayer(playerToEliminate));
    });

    //return playerToEliminate (nom du ministrer, exemple "Ministre de l'éducation");

}

// afficher le joueur elliminé
export function displayEliminatedPlayer(playerData_Name) {

    // displayMessage("replace", messages.joueurElimine + playerData_Name);
    console.log("playyyyyyyyer " + playerData_Name);
}

export function giveYourVoteToSomeone(listeDesMinistresRestant) {

    clear();
    background([255,0,0]);

    document.querySelector('.potentiometer').style.display = "block";
    placeCursorBeginning();
    document.body.addEventListener('touchmove', function(e){
        moveCursor(e, listeDesMinistresRestant);
    });
    title.innerHTML = "";
    displayMessage("replace", messages.donneTonVote);
    displayButton("valider");

}

export function placeCursorBeginning() {

    var i = 180;

    //donne une taille au rond intérieur en fonction de la taille de wheel
    subwheel.style.width = Math.floor((wheel.clientWidth)/2) + "px";
    subwheel.style.height = Math.floor((wheel.clientHeight)/2) + "px";
    subwheel.style.borderRadius = Math.floor((wheel.clientWidth)/4) + "px";
    radius = parseInt(subwheel.style.borderRadius);

    var x = Math.cos(i*Math.PI/180) * radius;
    var y = Math.sin(i*Math.PI/180) * radius;

    // positionne le cursor
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";

    // lui donne le bon translate
    var borderParent = parseInt(subwheel.style.borderRadius);
    var valueTranslate = borderParent - Math.floor((cursor.clientWidth)/2);
    cursor.style.transform = "translate(" + valueTranslate + "px," + valueTranslate + "px)";

}

export function moveCursor(e, listeDesMinistresRestant) {

    // on récupère la position x du doigt
    var posX = (e.targetTouches[0].clientX);

    // on récupère la largeur de la div qui va contenir l'arc de cercle et on calcule sa position par rapport à la taille de l'écran
    var widthWheel = (subwheel.clientWidth)*1.8; // on a appliqué un scale sur le
    var offsetLeftWheel = ((windowWidth-widthWheel)/2);

    // si le doigt n'est pas sur l'arc de cercle (qu'il est trop à gauche ou trop à droite) on normalise les valeurs
    if (posX < offsetLeftWheel) {
        posX = offsetLeftWheel;
    } else if (posX>widthWheel + offsetLeftWheel) {
        posX = widthWheel + offsetLeftWheel;
    }

    // on est sensé mapper cette position x pour obtenir un angle entre 0 et 360
    // ici on map entre -20 et 300 parce que ça rend plus facile la manipulation avec le doigt
    posX = map(posX, offsetLeftWheel, offsetLeftWheel+widthWheel, 0, 380);

    var i = 180 + (posX*180/(windowHeight));

    if (i<180) {
        i=180;
    } else if (i>360) {
        i=360;
    }

    console.log("i " + i);

    // calcule la position du disque sur l'arc de cercle
    // x et y sont inversés
    var x = Math.cos(i*Math.PI/180) * radius;
    var y = Math.sin(i*Math.PI/180) * radius;

    cursor.style.left = x + "px";
    cursor.style.top = y + "px";


    // on map la valeur de l'angle sur le nombre de joueurs (entre 0 et 30° = Joueur 0, entre 30 et 60 = Joueur 1 etc...)
    // on ajoute 1 à la deuxième valeur pour que le 360 soit compris dans le dernier joueur de la liste
    var selectedPlayer = map(i, 180, 361, 0, (listeDesMinistresRestant.length));

    // on affiche le nom du joueur sélectionné
    var playerName = subwheel.getElementsByTagName('p')[0];
    playerName.textContent = listeDesMinistresRestant[selectedPlayer];

    return selectedPlayer;


}




/***************
 *
 *   Fonctions-outils
 *
 ***************/

export function map(valueToMap, minInput, maxInput, minOutput, maxOutput) {

    return Math.floor((valueToMap - minInput) * (maxOutput - minOutput) / (maxInput - minInput) + minOutput);

}

export function background(color) {

    document.getElementsByTagName('html')[0].style.backgroundColor = "rgb(" + color[0] + "," +  color[1] + "," + color[2] + ")";
}




/***************
 *
 *   Fonctions communes aux deux phases de vote
 *
 ***************/

// crée les x emplacements pour les lois
export function createLaws(nbCards) {

    var lawsBlock = document.querySelector('.laws');
    for (var i=0; i<nbCards; i++) {
        var oneLaw = document.createElement("div");
        oneLaw.className += "law";
        oneLaw.className += " law-" + i;
        oneLaw.setAttribute('data-id', i.toString());
        lawsBlock.appendChild(oneLaw);
    }
}



/***************
 *
 *   Fonctions relatives à la deuxième phase de vote (joueur 2 choisi 1 lois parmi 2)
 *
 ***************/

// affiche les deux lois choisies par le Ministre actif sur ecran du Délégué
export function setLaws(lawsArray) {

    var laws = document.getElementsByClassName('law');

    for (var i=0; i<laws.length; i++) {
        laws[i].classList.add(lawsArray[i]);
        laws[i].setAttribute('data-type', lawsArray[i].toLowerCase());
        laws[i].addEventListener('click', selectOneLaw);
        var lawContent = document.createElement("p");
        var cardType = lawsArray[i];
        if (cardType === "humaniste") {
            cardType = "Humaniste"
        } else if (cardType === "progressiste") {
            cardType = "Progressiste";
        }
        lawContent.textContent = "Loi " + cardType;
        laws[i].appendChild(lawContent);
    }



}

// permet au Délégué de sélectionner une loi à envoyer au serveur
export function selectOneLaw(e) {

    var currentSelectedLaws = document.getElementsByClassName("selectedLaw").length;

    var thisLaw = e.target;

    if (thisLaw.classList.contains("selectedLaw")) {
        thisLaw.classList.remove("selectedLaw");
        removeWarning();
    } else {
        if (currentSelectedLaws<1) {
            thisLaw.classList.add("selectedLaw");
            removeWarning();
        } else {
            displayWarning(warnings.maxOneLaw);
        }

    }

    currentSelectedLaws = document.getElementsByClassName("selectedLaw").length;
    console.log(currentSelectedLaws);

    if (currentSelectedLaws === 1) {
        displayButton("valider");
    } else {
        removeButtons();
    }



}

// envois le choix de Délégué au serveur au click sur le validé
export function displayFinalLaw(e, socket) {

    var finalLaw = "";
    var selectedLaws = document.querySelector(".selectedLaw");

    if (selectedLaws.dataset.type === "humaniste" || selectedLaws.dataset.type === "progressiste") {
        finalLaw = selectedLaws.dataset.type; // on récupère de data-type
    } else {
        console.log("Erreur : le data-type est incorrect");
    }

    // envoyer loie selectionnée au server
    socket.emit("finalLaw", finalLaw);
    console.log(finalLaw);

    document.querySelector('.valider').removeEventListener('click', displayFinalLaw);

}



/***************
 *
 *   Fonctions relatives à la première phase de vote (joueur 1 choisi 2 lois parmi 3)
 *
 ***************/


// choisit une loi au hasard après le setTimeout
export function generateLaw(i) {

    //var thisLaw = document.getElementById(e.target.id);

    var thisLaw = document.getElementsByClassName('law')[i];

    var lawType = ["Humaniste", "Progressiste"];
    var index = Math.floor(Math.random()*lawType.length);
    var cardType = lawType[index];
    var oneLaw = thisLaw;
    oneLaw.className += " " + cardType.toLowerCase(); // on ajoute la class "progressiste" ou "humaniste" pour avoir le bon style
    oneLaw.setAttribute('data-type', cardType.toLowerCase()); // on ajoute le data-type pour le récupérer plus tard
    var lawContent = document.createElement("p");
    lawContent.textContent = "Loi " + cardType;
    oneLaw.appendChild(lawContent);

    thisLaw.removeEventListener('click', generateLaw);

    displayedLaws++;

    // quand trois lois sont affichées, on a la possibilité de les choisir
    if (displayedLaws === 3) {
        displayMessage("replace", messages.choisiDeuxLois);
        var laws = document.getElementsByClassName("law");
        for (var i=0; i<laws.length; i++) {
            laws[i].addEventListener('click', selectTwoLaws);
        }
    }

}

// permet au MINITSTRE ACTIF de sélectionner les deux lois à envoyer
export function selectTwoLaws(e) {

    var currentSelectedLaws = document.getElementsByClassName("selectedLaw").length;

    console.log(e);
    var thisLaw = e.target;

    if (thisLaw.classList.contains("selectedLaw")) {
        thisLaw.classList.remove("selectedLaw");
        removeWarning();
    } else {
        if (currentSelectedLaws<2) {
            thisLaw.classList.add("selectedLaw");
            removeWarning();
        } else {
            displayWarning(warnings.maxTwoLaws);
        }

    }

    currentSelectedLaws = document.getElementsByClassName("selectedLaw").length;
    console.log(currentSelectedLaws);

    if (currentSelectedLaws === 2) {
        displayButton("valider");
    } else {
        removeButtons();
    }

}

// Quand on clique sur "Valider" ça envoie les choix au Délégué
export function sendChoicesToPlayerTwo() {

    var lawsArray = {   '0':'',
        '1':''};
    var selectedLaws = document.getElementsByClassName("selectedLaw");

    for(var i=0; i<selectedLaws.length; i++) {
        if (selectedLaws[i].dataset.type === "humaniste" || selectedLaws[i].dataset.type === "progressiste") {
            lawsArray[i] = selectedLaws[i].dataset.type; // on récupère de data-type
        } else {
            console.log("Erreur : le data-type est incorrect");
        }

    }

    // à récupérer pour le socket
    console.log(lawsArray);

    document.querySelector('.valider').removeEventListener('click', sendChoicesToPlayerTwo);

}






/***************
 *
 *   Fonctions relatives à l'affichage des éléments textuels : boutons, messages, warnings
 *
 ***************/

// Affiche les différents éléments d'interface -

// afficher le titre d'une phase quand on rentre dedans
export function displayTitle(titleToDisplay) {
    // allume toutes les leds de la couleur de la phase
    // affiche sur l'écran qu'on rentre en phase d'élimination
    title.innerHTML = titleToDisplay;
}

// on peut soit envoyer un nom de bouton si c'est oui/non ou valider, par ex : displayButton("valider")
// soit envoyer un tableau de boutons si on veut "oui"/"non" : displayButton(["oui", "non"])
// soit envoyer un ou plusieurs bouton(s) personnalisé(s) (autre) : displayButton(["autre", "nom du bouton", "nom de l'autre bouton"]);
export function displayButton(buttonToDisplay, callback) {

    var button = "";

    if(typeof buttonToDisplay !== "string") { // c'est-à-dire si c'est un tableau, par exemple si on veut ajouter plusieurs boutons ("oui" et "non" par ex)
        if (buttonToDisplay[0] === "autre") { // si c'est un bouton personnalisé
            button = document.getElementsByClassName(buttonToDisplay[0]);
            for (var i=1; i<buttonToDisplay.length; i++) {
                button[i-1].textContent = buttonToDisplay[i];
                button[i-1].classList.add('active');
            }

        } else {
            button = [];
            for (var i=0; i<buttonToDisplay.length; i++) {
                button[i] = document.querySelector("." + buttonToDisplay[i]);
                button[i].classList.add('active');
            }
        }

        for (var j=0; j<button.length; j++) {
            button[j].addEventListener('click', receiveButtonValue); // ajoute un lsitenner pour récupérer le contenu du bouton
        }

    } else { // c'est-à-dire si le bouton est un bouton valider ou oui ou non (tout seul)
        button = document.querySelector("." + buttonToDisplay);
        button.classList.add('active');
        button.addEventListener('click', receiveButtonValue); // ajoute un lsitenner pour récupérer le contenu du bouton
    }

    if(callback && typeof callback == "function") {
        callback();
    }
}

// reçoit le contenu d'un bouton quand on clique dessus
export function receiveButtonValue(e) {

    console.log(e.target.textContent);
    _global.socket.emit(_global.emitToServer,{
        "sequence": _global.sequence,
        "value": e.target.textContent,
    });

    bienRecu(); // quand un joueur appuie sur un bouton, on lui envoie un message comme quoi on a bien reçu sa répons
    e.target.removeEventListener('click', receiveButtonValue);

}

// supprimer tous les boutons
export function removeButtons() {
    var buttons = document.getElementsByTagName('button');
    for (var i=0; i<buttons.length; i++) {
        buttons[i].classList.remove('active');
    }

}

/// MESSAGE
// envoyer un message
export function displayMessage(mode, message) {

    if (mode === "add") {
        var blocMessage = document.querySelector('.message').getElementsByTagName('p')[0];
        blocMessage.innerHTML += "<br>"+message;
    }

    if (mode === "replace") {
        var blocMessage = document.querySelector('.message').getElementsByTagName('p')[0];
        blocMessage.innerHTML = message;
    }

}

export function removeMessage() {

    var blocMessage = document.querySelector('.message').getElementsByTagName('p')[0];
    blocMessage.innerHTML = "";
}

// WARNING
/// afficher un warning
export function displayWarning(warning) {
    var blocWarning = document.querySelector('.warning');
    blocWarning.textContent = warning;
    blocWarning.classList.add('active');

}

/// surpimer warning
export function removeWarning() {
    var blocWarning = document.querySelector('.warning');
    blocWarning.classList.remove('active');
}



// fonction pour effacer les éléments de l'interface précédente
export function clear() {

    var elementsTexte = document.querySelectorAll('.autre, h1, p, .warning, .laws');
    var elementsTous = document.querySelectorAll('button, h1, p, div');
    var elementsActive = document.querySelectorAll('.active');

    for (var i = 0; i<elementsTexte.length; i++) {
        elementsTexte[i].textContent = "";
    }

    for (var i=0; i<elementsTous.length; i++) {
        elementsTous[i].removeAttribute('style');
    }

    for (var i=0; i<elementsActive.length; i++) {
        elementsActive[i].classList.remove('active');
    }

}

// envoie un feedback pour dire qu'on a bien reçu le message
export function bienRecu() {
    clear();
    background([0,0,0]);
    displayMessage("replace", _global.message);
}