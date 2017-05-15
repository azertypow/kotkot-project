/**
 * Created by mathi on 12/05/2017.
 */

function voteTimer(voteDuration) {

    clearLedColor();

    var currentVoteDuration = voteDuration;

    console.log("voteTimer");
    console.log("firstduration " + voteDuration)
    var clearCanvas = false;
    animationFromCenterToBorder(currentVoteDuration, voteDuration, clearCanvas, 1);

}



function animationFromCenterToBorder(currentVoteDuration, voteDuration, clearCanvas, howManyTimes) {

    currentVoteDuration--;

    if (clearCanvas) {
        clearLedColor();
    }

    for (var i=0; i<players; i++) {
        var ledId = centerToBorderCounter + i*numberOfLeds;
        ColorRGB = Blue;
        setColor(ledId, ColorRGB);
    }

    if (currentVoteDuration%(voteDuration/numberOfLeds) === 0) {
        centerToBorderCounter++;
    }

    if(centerToBorderCounter === numberOfLeds) {
        centerToBorderCounter = 0;
        howManyTimes--;
    }

    console.log(howManyTimes);

    // // if(centerToBorderCounter > numberOfLeds-1) {
    // //     centerToBorderCounter = 0;
    // // }
    //
    // // if (currentVoteDuration === 0) {
    // //     return;
    // // }
    //

    if(howManyTimes === 0) {
        return;
    }

    // requestAnimationFrame(myfunction(param)) ne marche pas
    // il faut utiliser une fonction anonyme : requestAnimationFrame(function() { myfunction(param); });
    requestAnimationFrame(function() {
        animationFromCenterToBorder(currentVoteDuration, voteDuration, clearCanvas, howManyTimes);
    });

}