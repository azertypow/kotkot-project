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

//playerOneLawSelection();
//playerTwoLawSelection();
elimination();


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
    for (var i=0; i<aLaw.length; i++) {
        aLaw[i].addEventListener('click', generateLaw);
    }
    document.getElementById('valider').addEventListener('click', sendChoicesToPlayerTwo);

}

// fonction à lancer pour la phase d'élimination

function elimination() {

    displayElimination();
    setTimeout(eliminateSomeone, 5000);

}


/***************
 *
 *   Fonctions pour le système d'élimination
 *
 ***************/



function displayElimination() {

    // allume toutes les LED en rouge pour 5 secondes

    document.getElementsByTagName('html')[0].style.backgroundColor = "red";
    phaseTitle.innerHTML = "Élimination";

}

function eliminateSomeone() {

    phaseTitle.innerHTML = "";
    displayMessage(messages.elimination);
    showValidationButton();

    //return playerToEliminate;

}

function determinePlayerToEliminate() {

    // fonction qui reçoit les 8 valeurs de playerToEliminate et renvoie celui qui a eu le plus de voix contre lui.
    // que faire en cas d'ex-aequo ?

    // return eliminatedPlayer;

}

function displayEliminatedPlayer() {

    displayMessage(messages.joueurElimine + "Nom du joueur");

}

function giveYourVoteToSomeone() {

    displayMessage(messages.donneTonVote);
    showValidationButton();

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


// choisit une loi au hasard quand on clique sur un carré
function generateLaw(e) {

    var thisLaw = document.getElementById(e.target.id);

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
        displayMessage(messages.choisiDeuxLois);
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

function displayMessage(message) {
    var blocMessage = document.getElementById('message').getElementsByTagName('p')[0];
    blocMessage.textContent = message;

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







