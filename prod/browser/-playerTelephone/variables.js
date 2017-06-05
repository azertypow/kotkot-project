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

var reponsesDesJoueurs = {
    "Ministre de l'Education":"non",
    "Ministre de l'Industrie":"oui",
    "Ministre de la Justice":"non",
    "Ministre de l'Information":"non",
    "Ministre de la Communication":"oui",
    "Ministre de la Sante":"non",
    "Ministre du Travail":"non",
    "Ministre de l'Armée":"oui"
};

var messages = {
    "tireTroisLois":"Tire trois lois au hasard",
    "choisiDeuxLois":"Choisis-en deux à envoyer à l'autre joueur",
    "elimination":"Choisis un joueur à éliminer",
    "donneTonVote":"Choisis un joueur à qui donner ton vote.",
    "joueurElimine":"Vous avez choisi d'éliminer",
    "bienrecu":"Bien reçu ;)",
    "voteConfiance":{
        "init": {
            "ministre+delegue":"Patientez",
            "autres1":"Avez-vous confiance dans le ministre sélectionné par le précédent délégué ? Si vous rejetez ce joueur en majorité, un nouveau délégué sera désigné au hasard"
        },
        "resultat":{
            "majoriteoui":"Vous avez fait confiance en majorité à ce ministre, il conserve son poste",
            "majoritenon":"Vous n'avez pas fait confiance à ce ministre. Je vais en désigner un pour vous",
            "nouveauchoix":"est désigné comme nouveau ministre actif"
        }
    }

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