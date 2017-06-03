/**
 * Created by mathi on 03/06/2017.
 */

const variables = require("./variables.js");

// Ce sont les morceaux de code qui sont appelés pendant le déroulement du jeu qui se passe dans script.js


// fonction à lancer pour que le joueur 2 puisse choisir sa loi parmi les 2 choix
export function playerTwoLawSelection() {

    background([0,0,255]);
    createLaws(2);
    setLaws(lawsArray);

}

// fonction à lancer pour que le joueur 1 puisse choisir ses 2 lois parmi les 3 choix
export function playerOneLawSelection() {

    background([0,0,255]);

    displayMessage(variables.messages.tireTroisLois);
    createLaws(3);

    // Ajoute les listeners
    let aLaw = document.getElementsByClassName('law');
    setTimeout(function() {generateLaw(0);}, 1000);
    setTimeout(function() {generateLaw(1);}, 1200);
    setTimeout(function() {generateLaw(2);}, 1400);

    document.getElementById('valider').addEventListener('click', sendChoicesToPlayerTwo);

}

// fonction à lancer pour la phase d'élimination
export function elimination() {

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

    background([0,0,0]);
    displayMessage("replace", "Est-ce que ton casque est bien branché ?");
    displayButton("oui");


}

// indique aux joueurs d'aller s'installer à leur place
export function installation() {

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

    background([0,0,0]);

    displayButton(["autre", "J'ai compris les règles", "Je souhaite les réécouter"]);
    // displayButton(["autre", "Je souhaite les réécouter"]);

}




/***************
 *
 *   Fonctions pour le système d'élimination
 *
 ***************/



export function displayElimination() {



    // allume toutes les LED en rouge pour 5 secondes

    // affiche sur l'écran qu'on rentre en phase d'élimination
    variables.title.innerHTML = "Élimination";

}

export function eliminateSomeone() {

    document.getElementById('potentiometer').style.display = "block";
    placeCursorBeginning();
    document.body.addEventListener('touchmove', moveCursor);
    variables.title.innerHTML = "";
    displayMessage("replace", variables.messages.elimination);
    displayButton("valider");


    //return playerToEliminate;

}

export function determinePlayerToEliminate() {

    // fonction qui reçoit les 8 valeurs de playerToEliminate et renvoie celui qui a eu le plus de voix contre lui.
    // que faire en cas d'ex-aequo ?

    // return eliminatedPlayer;

}

export function displayEliminatedPlayer() {

    displayMessage("replace", variables.messages.joueurElimine + "Nom du joueur");

}

export function giveYourVoteToSomeone() {

    displayMessage("replace", variables.messages.donneTonVote);
    displayButton("valider");


}

export function placeCursorBeginning() {

    let i = 180;

    let rayon = 175;

    //donne une taille au rond intérieur en fonction de la taille de wheel
    variables.subwheel.style.width = Math.floor((wheel.clientWidth)/2) + "px";
    variables.subwheel.style.height = Math.floor((wheel.clientHeight)/2) + "px";
    variables.subwheel.style.borderRadius = Math.floor((wheel.clientWidth)/4) + "px";
    // subwheel.style.width = rayon + "px";
    // subwheel.style.height = rayon + "px";
    // subwheel.style.borderRadius = rayon/2 + "px";
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

export function moveCursor(e) {

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
    playerName.textContent = listeDesMinistres[selectedPlayer];


}

export function hasardSelectionJoueur() {

    let message;

    setInterval(function() {
        let index = Math.floor(Math.random()*listeDesMinistres.length);
        message = listeDesMinistres[index];
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

    let lawsBlock = document.getElementById('laws');
    for (let i=0; i<nbCards; i++) {
        let oneLaw = document.createElement("div");
        oneLaw.setAttribute("class", "law");
        oneLaw.setAttribute("id", "law-" + i);
        lawsBlock.appendChild(oneLaw);
    }
}





/***************
 *
 *   Fonctions relatives à la deuxième phase de vote (joueur 2 choisi 1 lois parmi 2)
 *
 ***************/

// affiche les deux lois choisies par le J1
export function setLaws(lawsArray) {

    let laws = document.getElementsByClassName('law');

    for (let i=0; i<laws.length; i++) {
        laws[i].classList.add(lawsArray[i]);
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

// permet au J2 de sélectionner une loi à envoyer
export function selectOneLaw(e) {

    let currentSelectedLaws = document.getElementsByClassName("selectedLaw").length;

    let thisLaw = document.getElementById(e.target.id);

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



/***************
 *
 *   Fonctions relatives à la première phase de vote (joueur 1 choisi 2 lois parmi 3)
 *
 ***************/


// choisit une loi au hasard après le setTimeout
export function generateLaw(i) {

    //let thisLaw = document.getElementById(e.target.id);

    let thisLaw = document.getElementsByClassName('law')[i];

    let lawType = ["Humaniste", "Progressiste"];
    let index = Math.floor(Math.random()*lawType.length);
    let cardType = lawType[index];
    let oneLaw = thisLaw;
    oneLaw.className += " " + cardType.toLowerCase();
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

// permet au J1 de sélectionner les deux lois à envoyer
export function selectTwoLaws(e) {

    let currentSelectedLaws = document.getElementsByClassName("selectedLaw").length;

    let thisLaw = document.getElementById(e.target.id);

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

// Quand on clique sur "Valider" ça envoie les choix au J2
export function sendChoicesToPlayerTwo() {

    let lawsArray = {   '0':'',
        '1':''};
    let selectedLaws = document.getElementsByClassName("selectedLaw");

    for(let i=0; i<selectedLaws.length; i++) {
        console.log(selectedLaws[i].classList);
        if (selectedLaws[i].classList[1] === "humaniste" || selectedLaws[i].classList[1] === "progressiste") {
            lawsArray[i] = selectedLaws[i].classList[1]; // la class 1 correspond au type de loi
        } else {
            console.log("classList[1] ne correspond pas au type de loi");
        }

    }

    console.log(lawsArray);

    document.getElementById('valider').removeEventListener('click', sendChoicesToPlayerTwo);

}






/***************
 *
 *   Fonctions relatives à l'affichage des éléments textuels : boutons, messages, warnings
 *
 ***************/

// Affiche les différents éléments d'interface -

// on peut soit envoyer un nom de bouton si c'est oui/non/valider, par ex : displayButton("valider")
// soit envoyer un tableau de boutons : displayButton(["oui", "non"])
// soit envoyer un ou plusieurs bouton(s) personnalisé(s) (autre) : displayButton(["autre", "nom du bouton", "nom de l'autre bouton"]);
export function displayButton(buttonToDisplay) {

    let button;

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
                button[i] = document.getElementById(buttonToDisplay[i]);
                button[i].classList.add('active');
            }
        }
    } else {
        button = document.getElementById(buttonToDisplay);
        button.classList.add('active');
    }


}

export function removeButtons() {
    let buttons = document.getElementsByTagName('button');
    for (let i=0; i<buttons.length; i++) {
        buttons[i].classList.remove('active');
    }

}

export function displayMessage(mode, message) {

    if (mode === "add") {
        let blocMessage = document.getElementById('message').getElementsByTagName('p')[0];
        blocMessage.textContent += message;
    }

    if (mode === "replace") {
        let blocMessage = document.getElementById('message').getElementsByTagName('p')[0];
        blocMessage.textContent = message;
    }


}

export function displayWarning(warning) {
    let blocWarning = document.getElementById('warning');
    blocWarning.textContent = warning;
    blocWarning.classList.add('active');

}

export function removeWarning() {
    let blocWarning = document.getElementById('warning');
    blocWarning.classList.remove('active');
}

