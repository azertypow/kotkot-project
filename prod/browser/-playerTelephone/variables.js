/**
 * Created by mathi on 03/06/2017.
 */
// Ne sera pas dans le code final mais pour me permettre de tester temporairement le code

var listeDesMinistresRestant = [
    "Ministre de l'Education",
    "Ministre de l'Industrie",
    "Ministre de la Communication",
    "Ministre de la Santé",
    "Ministre du Travail",
    "Ministre de l'Armée"
];

var messages = {
    "tireTroisLois":"Tire trois lois au hasard",
    "choisiDeuxLois":"Choisis-en deux à envoyer à l'autre joueur",
    "elimination":"Choisis un joueur à éliminer",
    "donneTonVote":"Choisis un joueur à qui donner ton vote.",
    "joueurElimine":"Vous avez choisi d'éliminer",
    "bienrecu":"Bien reçu ;)"

};

var warnings = {
    "maxTwoLaws":"Tu ne peux pas sélectionner plus de deux lois",
    "maxOneLaw":"Tu ne peux pas sélectionner plus d'une loi",
    "notEnoughLaws":"Tu dois sélectionner deux lois",
    "tooSlow":"Dépêche-toi, tu n'as bientôt plus de temps"
};

var displayedLaws = 0;

var lawsArray = {
    '0':'humaniste',
    '1':'progressiste'
};

var title = document.querySelector('.title h1');

var wheel = document.querySelector('.wheel');
var cursor = document.querySelector('.cursor');
var subwheel = document.querySelector('.subwheel');
var cursorSlider = document.querySelector('.cursorSlider');
var wheelMark = document.querySelector('.wheelMark');

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var radius;
var numberOfPlayers = 8;

var titleDuration = 500; // la durée d'affichage des titres en ms
var premierTour = true;