/**
 * Created by mathi on 03/06/2017.
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

var listeDesMinistres = {
    "0":"Ministre de l'Education",
    "1":"Ministre de l'Industrie",
    "2":"Ministre de la Justice",
    "3":"Ministre de l'Information",
    "4":"Ministre de la Communication",
    "5":"Ministre de la Santé",
    "6":"Ministre du Travail",
    "7":"Ministre de l'Armée"
};