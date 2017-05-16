/**
 * Created by mathi on 15/05/2017.
 */


var messages = {
    "a":"Tire trois lois au hasard",
    "b":"Choisis-en deux à envoyer à l'autre joueur"
};

var displayedLaws = 0;

displayMessage(messages.a);

createLaws(3);


// Ajoute les listeners
var aLaw = document.getElementsByClassName('law');
for (var i=0; i<aLaw.length; i++) {
    aLaw[i].addEventListener('click', generateLaw);
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

function selectTwoLaws(e) {

    var thisLaw = document.getElementById(e.target.id);
    thisLaw.className += " selectedLaw";

}

function displayMessage(message) {

    var blocMessage = document.getElementById('message');
    blocMessage.textContent = message;

}


