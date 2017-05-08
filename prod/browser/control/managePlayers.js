/**
 * Created by mathi on 08/05/2017.
 */

var nbPlayers = 8;
var selectedPlayers = [];


setup();

function setup () {

    addPlayersToInterface(nbPlayers);

}

// quand on clic sur un joueur déjà sélectionné, ça le déselectionne
function removePlayer(playerToRemove, playerId) {

    console.log("removeplayer");

    playerToRemove.classList.remove('playerSelected');
    playerToRemove.removeAttribute('style');

    var id = selectedPlayers.indexOf(playerId);
    selectedPlayers.splice(id, 1);

}


// quand on clic sur un joueur ça modifie sa couleur de fond et l'ajoute dans le tableau "selectedPlayers"
function addPlayers(e) {

    console.log(e.target.className);

    var list = e.target.className;
    var lastCharacter = e.target.textContent.length;
    var selectedPlayer = e.target.textContent[lastCharacter - 1];  // on récupère le dernier caractère du contenu pour avoir le numéro du joueur


    // si reclic sur un joueur déjà sélectionné, on lance la fonction pour le déselectionner
    if (list.indexOf('playerSelected') !== -1) {
        console.log('deja');
        removePlayer(e.target, selectedPlayer);
        return;
    }

        console.log(e.target.textContent.length);

        var player = e.target;
        player.className += " playerSelected";
        player.style.backgroundColor = "#0ff";

        selectedPlayers.push(selectedPlayer);

        console.log(selectedPlayers);


}


// on ajoute à l'interface html
function addPlayersToInterface(nbPlayers) {

    console.log("addplayers");
    var playerSection = document.getElementById('players');

    var boxPlayers = document.createElement('div');
    boxPlayers.setAttribute('id', 'boxplayers');
    playerSection.appendChild(boxPlayers);

    for (var i=0; i<nbPlayers; i++) {
            var aPlayer = document.createElement("p");
            aPlayer.setAttribute("class", "aPlayer" + " aPlayer-" + i);
            aPlayer.textContent = "Joueur " + i;
            boxPlayers.appendChild(aPlayer);
    }

    var players = document.getElementsByClassName('aPlayer');

    for (var j=0; j<players.length; j++) {
        players[j].addEventListener('click', addPlayers);
    }

}