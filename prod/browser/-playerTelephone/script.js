/**
 * Created by mathi on 15/05/2017.
 */


var messages = {
    "a":"Tire trois lois au hasard",
    "b":"Choisis-en deux à envoyer à l'autre joueur"
};

var warnings = {
    "maxTwoLaws":"Tu ne peux pas sélectionner plus de deux lois",
    "notEnoughLaws":"Tu dois sélectionner deux lois",
    "tooSlow":"Dépêche-toi, tu n'as bientôt plus de temps"
}

var displayedLaws = 0;

displayMessage(messages.a);

createLaws(3);


// Ajoute les listeners
var aLaw = document.getElementsByClassName('law');
for (var i=0; i<aLaw.length; i++) {
    aLaw[i].addEventListener('click', generateLaw);
}

document.getElementById('valider').addEventListener('click', sendChoicesToPlayerTwo)


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

}

// crée les 3 emplacements pour les lois
function createLaws(nbCards) {

    var lawsBlock = document.getElementById('laws');
    for (var i=0; i<nbCards; i++) {
        var oneLaw = document.createElement("div");
        oneLaw.setAttribute("class", "law");
        oneLaw.setAttribute("id", "law-" + i);
        lawsBlock.appendChild(oneLaw);
    }
}

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
        displayMessage(messages.b);
        var laws = document.getElementsByClassName("law");
        for (var i=0; i<laws.length; i++) {
            laws[i].addEventListener('click', selectTwoLaws);
        }

    }

}

var maxLawsToSelect = 2;


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

