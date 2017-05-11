/**
 * Created by mathi on 11/05/2017.
 */


loop();

function loop() {

    clearLedColor();
    //playerSelection(players, [0,5]);
    animationPlayerSelection();
    requestAnimationFrame(loop);

}