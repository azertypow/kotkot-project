/**
 * Created by mathi on 03/06/2017.
 */

// Ce sont les morceaux de code qui sont appelés pendant le déroulement du jeu qui se passe dans script.js


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
    displayElimination();
    setTimeout(eliminateSomeone, 500);

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
    displayButton("oui");


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

// afficher la phase d'élimination sur ecran
export function displayElimination() {



    // allume toutes les LED en rouge pour 5 secondes

    // affiche sur l'écran qu'on rentre en phase d'élimination
    title.innerHTML = "Élimination";

}

// afficher le potentiometre pour le vote
export function eliminateSomeone(listeDesMinistresRestant) {

    document.querySelector('.potentiometer').style.display = "block";
    placeCursorBeginning();
    document.body.addEventListener('touchmove', function(){
        moveCursor(e, listeDesMinistresRestant);
    });
    title.innerHTML = "";
    displayMessage("replace", messages.elimination);
    displayButton("valider");


    //return playerToEliminate (nom du ministrer, exemple "Ministre de l'éducation");

}

// afficher le joueur elliminé
export function displayEliminatedPlayer(playerData_Name) {

    displayMessage("replace", messages.joueurElimine + playerData_Name);

}

export function giveYourVoteToSomeone(nombreDeJouerRestant) {

    displayMessage("replace", messages.donneTonVote);
    displayButton("valider");

}

export function placeCursorBeginning() {

    let i = 180;

    //donne une taille au rond intérieur en fonction de la taille de wheel
    subwheel.style.width = Math.floor((wheel.clientWidth)/2) + "px";
    subwheel.style.height = Math.floor((wheel.clientHeight)/2) + "px";
    subwheel.style.borderRadius = Math.floor((wheel.clientWidth)/4) + "px";
    radius = parseInt(subwheel.style.borderRadius);

    let x = Math.cos(i*Math.PI/180) * radius;
    let y = Math.sin(i*Math.PI/180) * radius;

    // positionne le cursor
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";

    // lui donne le bon translate
    let borderParent = parseInt(subwheel.style.borderRadius);
    let valueTranslate = borderParent - Math.floor((cursor.clientWidth)/2);
    cursor.style.transform = "translate(" + valueTranslate + "px," + valueTranslate + "px)";

}

export function moveCursor(e, listeDesMinistresRestant) {

    // on récupère la position x du doigt
    let posX = (e.targetTouches[0].clientX);

    // on récupère la largeur de la div qui va contenir l'arc de cercle et on calcule sa position par rapport à la taille de l'écran
    let widthWheel = (subwheel.clientWidth)*1.8; // on a appliqué un scale sur le
    let offsetLeftWheel = ((windowWidth-widthWheel)/2);

    // si le doigt n'est pas sur l'arc de cercle (qu'il est trop à gauche ou trop à droite) on normalise les valeurs
    if (posX < offsetLeftWheel) {
        posX = offsetLeftWheel;
    } else if (posX>widthWheel + offsetLeftWheel) {
        posX = widthWheel + offsetLeftWheel;
    }

    // on est sensé mapper cette position x pour obtenir un angle entre 0 et 360
    // ici on map entre -20 et 300 parce que ça rend plus facile la manipulation avec le doigt
    posX = map(posX, offsetLeftWheel, offsetLeftWheel+widthWheel, -20, 300);

    let i = 180 + (posX*180/(windowHeight));

    if (i<180) {
        i=180;
    } else if (i>360) {
        i=360;
    }

    console.log("i " + i);

    // calcule la position du disque sur l'arc de cercle
    // x et y sont inversés
    let x = Math.cos(i*Math.PI/180) * radius;
    let y = Math.sin(i*Math.PI/180) * radius;

    cursor.style.left = x + "px";
    cursor.style.top = y + "px";


    // on map la valeur de l'angle sur le nombre de joueurs (entre 0 et 30° = Joueur 0, entre 30 et 60 = Joueur 1 etc...)
    let selectedPlayer = map(i, 180, 360, 0, numberOfPlayers-1);

    // on affiche le nom du joueur sélectionné
    let playerName = subwheel.getElementsByTagName('p')[0];
    playerName.textContent = listeDesMinistresRestant[selectedPlayer];


}

// animation sur ecran joueur si il y a selection au asard du nouveau joueur suite à un vote de confiance non validé
export function hasardSelectionJoueur(listeDesMinistresRestant) {

    let message;

    setInterval(function() {
        let index = Math.floor(Math.random()*listeDesMinistresRestant.length);
        message = listeDesMinistresRestant[index];
        console.log('jai lu');
        displayMessage("replace", message);
        // régler le style ? ici le message est un peu haut
        // document.getElementById("message").style.marginTop = "150px";
    }, 70);


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

    let lawsBlock = document.querySelector('.laws');
    for (let i=0; i<nbCards; i++) {
        let oneLaw = document.createElement("div");
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

    let laws = document.getElementsByClassName('law');

    for (let i=0; i<laws.length; i++) {
        laws[i].classList.add(lawsArray[i]);
        laws[i].setAttribute('data-type', lawsArray[i].toLowerCase());
        laws[i].addEventListener('click', selectOneLaw);
        let lawContent = document.createElement("p");
        let cardType = lawsArray[i];
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

    let currentSelectedLaws = document.getElementsByClassName("selectedLaw").length;

    let thisLaw = e.target;

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

    let finalLaw = "";

    let selectedLaws = document.querySelector(".selectedLaw");


    if (selectedLaws.dataset.type === "humaniste" || selectedLaws.dataset.type === "progressiste") {
        finalLaw = selectedLaws.dataset.type; // on récupère de data-type
    } else {
        console.log("Erreur : le data-type est incorrect");
    }

    // envoyer loie selectionnée au server
    socket.emit("finalLaw", finalLaw);
    console.log(finalLaw);

    document.querySelector('.valider').removeEventListener('click', function(e, socket){
        displayFinalLaw(e, socket);
    });

}



/***************
 *
 *   Fonctions relatives à la première phase de vote (joueur 1 choisi 2 lois parmi 3)
 *
 ***************/


// choisit une loi au hasard après le setTimeout
export function generateLaw(i) {

    //var thisLaw = document.getElementById(e.target.id);

    let thisLaw = document.getElementsByClassName('law')[i];

    let lawType = ["Humaniste", "Progressiste"];
    let index = Math.floor(Math.random()*lawType.length);
    let cardType = lawType[index];
    let oneLaw = thisLaw;
    oneLaw.className += " " + cardType.toLowerCase(); // on ajoute la class "progressiste" ou "humaniste" pour avoir le bon style
    oneLaw.setAttribute('data-type', cardType.toLowerCase()); // on ajoute le data-type pour le récupérer plus tard
    let lawContent = document.createElement("p");
    lawContent.textContent = "Loi " + cardType;
    oneLaw.appendChild(lawContent);

    thisLaw.removeEventListener('click', generateLaw);

    displayedLaws++;

    // quand trois lois sont affichées, on a la possibilité de les choisir
    if (displayedLaws === 3) {
        displayMessage("replace", messages.choisiDeuxLois);
        let laws = document.getElementsByClassName("law");
        for (let i=0; i<laws.length; i++) {
            laws[i].addEventListener('click', selectTwoLaws);
        }
    }

}

// permet au MINITSTRE ACTIF de sélectionner les deux lois à envoyer
export function selectTwoLaws(e) {

    let currentSelectedLaws = document.getElementsByClassName("selectedLaw").length;

    console.log(e);
    let thisLaw = e.target;

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

    let lawsArray = {   '0':'',
        '1':''};
    let selectedLaws = document.getElementsByClassName("selectedLaw");

    for(let i=0; i<selectedLaws.length; i++) {
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

// on peut soit envoyer un nom de bouton si c'est oui/non ou valider, par ex : displayButton("valider")
// soit envoyer un tableau de boutons si on veut "oui"/"non" : displayButton(["oui", "non"])
// soit envoyer un ou plusieurs bouton(s) personnalisé(s) (autre) : displayButton(["autre", "nom du bouton", "nom de l'autre bouton"]);
export function displayButton(buttonToDisplay) {

    let button = "";

    console.log(buttonToDisplay);

    if(typeof buttonToDisplay !== "string") { // c'est-à-dire si c'est un tableau, par exemple si on veut ajouter plusieurs boutons ("oui" et "non" par ex)
        if (buttonToDisplay[0] === "autre") { // si c'est un bouton personnalisé
            button = document.getElementsByClassName(buttonToDisplay[0]);
            for (let i=1; i<buttonToDisplay.length; i++) {
                button[i-1].textContent = buttonToDisplay[i];
                button[i-1].classList.add('active');
            }

        } else {
            button = [];
            for (let i=0; i<buttonToDisplay.length; i++) {
                button[i] = document.querySelector("." + buttonToDisplay[i]);
                button[i].classList.add('active');
            }
        }

        for (let j=0; j<button.length; j++) {
            button[j].addEventListener('click', receiveButtonValue); // ajoute un lsitenner pour récupérer le contenu du bouton
        }

    } else { // c'est-à-dire si le bouton est un bouton valider ou oui ou non (tout seul)
        button = document.querySelector("." + buttonToDisplay);
        button.classList.add('active');
        button.addEventListener('click', receiveButtonValue); // ajoute un lsitenner pour récupérer le contenu du bouton
    }


}

// reçoit le contenu d'un bouton quand on clique dessus
export function receiveButtonValue(e) {

    console.log(e.target.textContent);
    // e.target.removeEventListener(click, receiveButtonValue);

}

// supprimer tous les boutons
export function removeButtons() {
    let buttons = document.getElementsByTagName('button');
    for (let i=0; i<buttons.length; i++) {
        buttons[i].classList.remove('active');
    }

}

/// MESSAGE
// envoyer un message
export function displayMessage(mode, message) {

    if (mode === "add") {
        let blocMessage = document.querySelector('.message').getElementsByTagName('p')[0];
        blocMessage.innerHTML += "<br>"+message;
    }

    if (mode === "replace") {
        let blocMessage = document.querySelector('.message').getElementsByTagName('p')[0];
        blocMessage.textContent = message;
    }

}

export function removeMessage() {

    let blocMessage = document.querySelector('.message').getElementsByTagName('p')[0];
    blocMessage.innerHTML = "";
}

// WARNING
/// afficher un warning
export function displayWarning(warning) {
    let blocWarning = document.querySelector('.warning');
    blocWarning.textContent = warning;
    blocWarning.classList.add('active');

}

/// surpimer warning
export function removeWarning() {
    let blocWarning = document.querySelector('.warning');
    blocWarning.classList.remove('active');
}



// fonction pour effacer les éléments de l'interface précédente
export function clear() {

    let elementsTexte = document.querySelectorAll('.autre, h1, p, .warning, .laws');
    let elementsTous = document.querySelectorAll('button, h1, p, div');
    let elementsActive = document.querySelectorAll('.active');

    console.log(elementsActive);

    for (let i = 0; i<elementsTexte.length; i++) {
        console.log(elementsTexte[i]);
        elementsTexte[i].textContent = "";
    }

    for (let i=0; i<elementsTous.length; i++) {
        console.log(elementsTous[i]);
        elementsTous[i].removeAttribute('style');
    }

    for (let i=0; i<elementsActive.length; i++) {
        console.log(elementsActive[i]);
        elementsActive[i].classList.remove('active');
    }

}