/**
 * Created by mathi on 12/05/2017.
 */

function selectTwoPlayers() {

    clearLedColor();
    animationPlayerSelection();

    durationPlayerSelection--;

    if (durationPlayerSelection === 0) {
        playerSelection(players, [0,3]);
        return;
    }

    requestAnimationFrame(selectTwoPlayers);

}