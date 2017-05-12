/**
 * Created by mathi on 12/05/2017.
 */

function selectTwoPlayers(selectedPlayers) {

    clearLedColor();
    animationPlayerSelection();

    durationPlayerSelection--;

    if (durationPlayerSelection === 0) {
        playerSelection(players, selectedPlayers);
        return;
    }

    requestAnimationFrame(function()  {
        selectTwoPlayers(selectedPlayers);
    });

}