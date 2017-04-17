/**
 * Created by mathi on 17/04/2017.
 */

/****************
 *				*
 *	PHRASES		*
 *				*
 *****************/


var sentencesFirstStage = [
//[id, est-ce que la question a ete posee ?, intitulé de la question, si il répond oui quelle variable change, de combien la variable change]
    [0, "Est-ce que tu veux tuer quelqu'un ?", "agressivite", 2],
    [1, "Est-ce que tu penses que vous faites une bonne équipe ?", "deviance", -2],
    [2, "Penses-tu avoir repéré tes coéquipiers ?", "manipulabilite", 1]
];

var sentencesSecondStage = [
    [	0,
        ["Plusieurs personnes veulent de tuer.",
            "Une personne voudrait te tuer.",
            "Il semble que personne ne souhaite te tuer."]

    ],

    [	1,
        ["A part toi, personne autour de cette table ne pense que vous faites une bonne équipe.",
            "Vous semblez être peu à aimer cette équipe."]

    ],

    [	2,
        ["Des putschers pensent que tu fais partie de leur équipe.",
            "Des ministres pensent que tu es putscher."]

    ]

];


// Variables globales
var players = [];
var nombreDeJoueurs = 5;
var currentStage = "firstStage";
var sentenceToRead = document.getElementById('sentenceToRead');



setup();

function setup() {
    addPlayers();
    tellSentences();
}


function addPlayers() {

    for (var i=0; i<nombreDeJoueurs; i++)  {
        players.push(new Player());
    }
    console.log(players);

}


function tellSentences() {


    // Si on est dans la première phase
    if (currentStage == "firstStage") {
        var randomPlayer = Math.floor(Math.random()*nombreDeJoueurs);
        tellOneSentence(currentStage, randomPlayer); // on choisit le joueur à qui la machine va parler
    }

    // if (currentStage == "secondStage") {
    //
    // }

}

function tellOneSentence(currentStage, player) {


    if (currentStage == "firstStage") {
        var array = sentencesFirstStage; // on va chercher le tableau contenant les phrases de la phase en cours
    }

    var randomSentence = Math.floor(Math.random()*array.length); // On choisit une phrase au hasard

    say(player, array[randomSentence]);


}

function say(player, sentence) {

    var sentenceId = sentence[0];
    var sentenceToSay = sentence[1];
    var facet = sentence[2]; // correspond à la facette de personnalité qui va changer : agressivité/déviance/manipulabilite
    var coef = sentence[3]; // correspond au coef : +1/+2/-1/-2 etc...

    sentenceToRead.innerHTML = sentenceToSay; //on innerHTML la phrase pour qu'elle soit lue


    var answer = "yes";

    // en fonction de la réponse donnée par le joueur, on change ses traits de personnalité
    if (answer == "yes") {
        players[player].personnalite[facet] += coef;
    } else {
        players[playera].personnalite[facet] -= coef;
    }

    //on ajoute l'id de la phrase dans un tableau qui recense les phrases entendues
    //cela va permettre de savoir quelles phrases lui proposer en phase 2
    players[player].listenedSentences.push(sentenceId);

    console.log(players[player]);

}