/**
 * Created by mathi on 15/05/2017.
 */

var messages = {
    "tireTroisLois":"Tire trois lois au hasard",
    "choisiDeuxLois":"Choisis-en deux à envoyer à l'autre joueur",
    "elimination":"Choisis un joueur à éliminer",
    "donneTonVote":"Choisis un joueur à qui donner tes votes. Attention, tu démultiplie la puissance de joueur.",
    "joueurElimine":"Vous avez choisi d'éliminer"

};

var warnings = {
    "maxTwoLaws":"Tu ne peux pas sélectionner plus de deux lois",
    "maxOneLaw":"Tu ne peux pas sélectionner plus d'une loi",
    "notEnoughLaws":"Tu dois sélectionner deux lois",
    "tooSlow":"Dépêche-toi, tu n'as bientôt plus de temps"
}

var displayedLaws = 0;

var lawsArray = {
    '0':'humaniste',
    '1':'progressiste'
};

var phaseTitle = document.getElementById('phaseTitle');

var wheel = document.getElementById('wheel');
var cursor = document.getElementById('cursor');
var subwheel = document.getElementById('subwheel');
var cursorSlider = document.getElementById('cursorSlider');
var wheelMark = document.getElementById('wheelMark');

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var radius;
var marge = 50; // marge en haut et en bas du slider
var numberOfPlayers = 8;




//playerOneLawSelection();
//playerTwoLawSelection();
//elimination();
attenteDeConnexionDesJoueurs();


// fonction à lancer pour que le joueur 2 puisse choisir sa loi parmi les 2 choix
function playerTwoLawSelection() {

    createLaws(2);
    setLaws(lawsArray);

}

// fonction à lancer pour que le joueur 1 puisse choisir ses 2 lois parmi les 3 choix
function playerOneLawSelection() {

    displayMessage(messages.tireTroisLois);
    createLaws(3);

    // Ajoute les listeners
    var aLaw = document.getElementsByClassName('law');
    setTimeout(function() {generateLaw(0);}, 1000);
    setTimeout(function() {generateLaw(1);}, 1200);
    setTimeout(function() {generateLaw(2);}, 1400);

    document.getElementById('valider').addEventListener('click', sendChoicesToPlayerTwo);

}

// fonction à lancer pour la phase d'élimination
function elimination() {

    displayElimination();
    setTimeout(eliminateSomeone, 500);

}


/***************
 *
 *   Introduction
 *
 ***************/

function attenteDeConnexionDesJoueurs() {
    displayMessage("replace", "Attente de connexion des autres joueurs. ");

    // si les joueurs mettent trop de temps à se connecter.
    setTimeout(function () {
        displayMessage("add", "Dis-leur de se dépêcher, on a pas toute la nuit");
    }, 2000);
}


/***************
 *
 *   Fonctions pour le système d'élimination
 *
 ***************/



function displayElimination() {

    // allume toutes les LED en rouge pour 5 secondes
    document.getElementsByTagName('html')[0].style.backgroundColor = "red";

    // affiche sur l'écran qu'on rentre en phase d'élimination
    phaseTitle.innerHTML = "Élimination";

}

function eliminateSomeone() {

    document.getElementById('potentiometer').style.display = "block";
    placeCursorBeginning();
    document.body.addEventListener('touchmove', moveCursor);
    phaseTitle.innerHTML = "";
    displayMessage("replace", messages.elimination);
    showValidationButton();


    //return playerToEliminate;

}

function determinePlayerToEliminate() {

    // fonction qui reçoit les 8 valeurs de playerToEliminate et renvoie celui qui a eu le plus de voix contre lui.
    // que faire en cas d'ex-aequo ?

    // return eliminatedPlayer;

}

function displayEliminatedPlayer() {

    displayMessage("replace", messages.joueurElimine + "Nom du joueur");

}

function giveYourVoteToSomeone() {

    displayMessage("replace", messages.donneTonVote);
    showValidationButton();

}

function placeCursorBeginning() {

    var i = 180;

    var rayon = 175;

    //donne une taille au rond intérieur en fonction de la taille de wheel
    subwheel.style.width = Math.floor((wheel.clientWidth)/2) + "px";
    subwheel.style.height = Math.floor((wheel.clientHeight)/2) + "px";
    subwheel.style.borderRadius = Math.floor((wheel.clientWidth)/4) + "px";
    // subwheel.style.width = rayon + "px";
    // subwheel.style.height = rayon + "px";
    // subwheel.style.borderRadius = rayon/2 + "px";
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

function moveCursor(e) {



    var posX = (e.targetTouches[0].clientX);

    var widthWheel = (subwheel.clientWidth)*1.8;
    var offsetLeftWheel = ((windowWidth-widthWheel)/2);

    console.log(widthWheel);
    console.log(offsetLeftWheel);

    if (posX < offsetLeftWheel) {
        posX = offsetLeftWheel;
    } else if (posX>widthWheel + offsetLeftWheel) {
        posX = widthWheel + offsetLeftWheel;
    }

    posX = map(posX, offsetLeftWheel, offsetLeftWheel+widthWheel, 0, 360);
    // var topMarginWheelMark = 50;
    // var bottomMarginWheelMark = wheelMark.clientHeight-cursorSlider.clientHeight;

    // if (posY < topMarginWheelMark) {
    //     posY = topMarginWheelMark;
    // } else if (posY > bottomMarginWheelMark) {
    //     posY = windowHeight-bottomMarginWheelMark;
    // }

    var i = 180 + (posX*180/(windowHeight));

    if (i<180) {
        i=180;
    } else if (i>360) {
        i=360;
    }

    console.log("i " + i);

    // x et y sont inversés
    var x = Math.cos(i*Math.PI/180) * radius;
    var y = Math.sin(i*Math.PI/180) * radius;

    cursor.style.left = x + "px";
    cursor.style.top = y + "px";

    //console.log("posY " + posY);

    // if (posY<0) {
    //     posY = 0;
    // } else if (posY>windowHeight) {
    //     posY = windowHeight;
    // }

    //var sliderTopPosition = map(posY, 0, windowHeight, 0, bottomMarginWheelMark);

    // cursorSlider.style.top = sliderTopPosition + "px";
    // console.log("windowHeight " + windowHeight);
    // console.log("posY " + posY);
    // console.log("top slider cursor " + cursorSlider.style.top);

    //console.log(cursor.style.left);

    var selectedPlayer = map(i, 180, 360, 0, numberOfPlayers-1);

    var playerName = subwheel.getElementsByTagName('p')[0];
    playerName.textContent = "Joueur " + selectedPlayer;


}


function map(valueToMap, minInput, maxInput, minOutput, maxOutput) {

    return Math.floor((valueToMap - minInput) * (maxOutput - minOutput) / (maxInput - minInput) + minOutput);

}






/***************
 *
 *   Fonctions communes aux deux phases de vote
 *
 ***************/

// crée les x emplacements pour les lois
function createLaws(nbCards) {

    var lawsBlock = document.getElementById('laws');
    for (var i=0; i<nbCards; i++) {
        var oneLaw = document.createElement("div");
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
function setLaws(lawsArray) {

    var laws = document.getElementsByClassName('law');

    for (var i=0; i<laws.length; i++) {
        laws[i].classList.add(lawsArray[i]);
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

// permet au J2 de sélectionner une loi à envoyer
function selectOneLaw(e) {

    var currentSelectedLaws = document.getElementsByClassName("selectedLaw").length;

    var thisLaw = document.getElementById(e.target.id);

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
        showValidationButton();
    } else {
        hideValidationButton();
    }

}



/***************
 *
 *   Fonctions relatives à la première phase de vote (joueur 1 choisi 2 lois parmi 3)
 *
 ***************/


// choisit une loi au hasard après le setTimeout
function generateLaw(i) {

    //var thisLaw = document.getElementById(e.target.id);

    var thisLaw = document.getElementsByClassName('law')[i];

    var lawType = ["Humaniste", "Progressiste"];
    var index = Math.floor(Math.random()*lawType.length);
    var cardType = lawType[index];
    var oneLaw = thisLaw;
    oneLaw.className += " " + cardType.toLowerCase();
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

// permet au J1 de sélectionner les deux lois à envoyer
function selectTwoLaws(e) {

    var currentSelectedLaws = document.getElementsByClassName("selectedLaw").length;

    var thisLaw = document.getElementById(e.target.id);

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
        showValidationButton();
    } else {
        hideValidationButton();
    }

}

// Quand on clique sur "Valider" ça envoie les choix au J2
function sendChoicesToPlayerTwo() {

    var lawsArray = {   '0':'',
        '1':''};
    var selectedLaws = document.getElementsByClassName("selectedLaw");

    for(var i=0; i<selectedLaws.length; i++) {
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

function showValidationButton() {
    var button = document.getElementById('valider');
    button.classList.add('active');
}

function hideValidationButton() {
    var button = document.getElementById('valider');
    button.classList.remove('active');
}

function displayMessage(mode, message) {

    if (mode === "add") {
        var blocMessage = document.getElementById('message').getElementsByTagName('p')[0];
        blocMessage.textContent += message;
    }

    if (mode === "replace") {
        var blocMessage = document.getElementById('message').getElementsByTagName('p')[0];
        blocMessage.textContent = message;
    }


}

function displayWarning(warning) {
    var blocWarning = document.getElementById('warning');
    blocWarning.textContent = warning;
    blocWarning.classList.add('active');

}

function removeWarning() {
    var blocWarning = document.getElementById('warning');
    blocWarning.classList.remove('active');
}







