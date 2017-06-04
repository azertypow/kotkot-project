/**
 * Created by mathi on 15/05/2017.
 */


var pathToText = '../../../data/text.json';

// playerOneLawSelection();
// playerTwoLawSelection();
// elimination();
// installation();
brancheCasque();
// hasardSelectionJoueur();
// ecouteDesRegles();


// Quand un joueur lance l'application

// importe les fichiers json



// fetchJSONFile(pathToText, function(text){
//     console.log(text.messages.intro["casque branche"]);
// });


// Quand un joueur lance l'application
// indique aux joueurs de brancher leurs casques
function brancheCasque() {
    background([0,0,0]);
    displayMessage("replace", "Est-ce que ton casque est bien branché ?"); // text.messages.intro["casque branche"]
    displayButton("oui");
}

