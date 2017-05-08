/**
 * Created by mathi on 08/05/2017.
 */

var nbPlayers = 8;

function setup () {

    addPlayersToInterface(nbPlayers);

}

function addPlayersToInterface(nbPlayers) {

    console.log("addplayers");
    var playerSection = document.getElementById('players');
    for (var i=0; i<nbPlayers; i++) {

            var aPlayer = document.createElement("p");
            aPlayer.setAttribute("class", "aPlayer" + " aPlayer-" + i);
            aPlayer.textContent = "Joueur " + i;
            playerSection.appendChild(aPlayer);
    }

}