/**
 * Created by azertypow on 09/05/2017.
 */

/**
 * Created by mathi on 08/05/2017.
 */

export default class ManagePlayers{

    static run(selectedPlayers: Array<number>){
        let nbPlayers: number = 6;

        setup();

        function setup () {

            addPlayersToInterface(nbPlayers);

        }

        // quand on clic sur un joueur déjà sélectionné, ça le déselectionne
        function removePlayer(playerToRemove: Element, playerId: number) {

            console.log("removeplayer");

            playerToRemove.classList.remove('playerSelected');
            playerToRemove.removeAttribute('style');

            let id: number = selectedPlayers.indexOf(playerId);
            selectedPlayers.splice(id, 1);

        }


        // quand on clic sur un joueur ça modifie sa couleur de fond et l'ajoute dans le tableau "selectedPlayers"
        function addPlayers(e: MouseEvent) {

            console.log( (<HTMLElement>e.target).className);

            let list: string = (<HTMLElement>e.target).className;
            let lastCharacter: number = (<HTMLElement>e.target).textContent.length;
            let selectedPlayer: number = parseInt( (<HTMLElement>e.target).textContent[lastCharacter - 1] );  // on récupère le dernier caractère du contenu pour avoir le numéro du joueur


            // si reclic sur un joueur déjà sélectionné, on lance la fonction pour le déselectionner
            if (list.indexOf('playerSelected') !== -1) {
                console.log('deja');
                removePlayer( (<HTMLElement>e.target), selectedPlayer );
                return;
            }

            console.log( (<HTMLElement>e.target).textContent.length );

            let player: HTMLElement = <HTMLElement>e.target;
            player.className += " playerSelected";
            player.style.backgroundColor = "#0ff";

            selectedPlayers.push(selectedPlayer);

            console.log(selectedPlayers);


        }


        // on ajoute à l'interface html
        function addPlayersToInterface(nbPlayers: number) {

            console.log("addplayers");
            let playerSection: HTMLElement = document.getElementById('players');

            let boxPlayers: HTMLElement = document.createElement('div');
            boxPlayers.setAttribute('id', 'boxplayers');
            playerSection.appendChild(boxPlayers);

            for (let i: number = 1; i<nbPlayers + 1; i++) {
                let aPlayer: HTMLElement = document.createElement("p");
                aPlayer.setAttribute("class", "aPlayer" + " aPlayer-" + i);
                aPlayer.textContent = "Joueur " + i;
                boxPlayers.appendChild(aPlayer);
            }

            let players: HTMLCollection = document.getElementsByClassName('aPlayer');

            for (let j: number = 0; j<players.length; j++) {
                players[j].addEventListener('click', addPlayers);
            }

        }
    }
}