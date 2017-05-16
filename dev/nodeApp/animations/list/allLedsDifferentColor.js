/**
 * Created by mathi on 15/05/2017.
 */

function allLedsDifferentColor() {

    for (var ledId=0; ledId<totalNumberOfLeds; ledId++) {
        ColorRGB = chooseColor([Blue, Blue, Blue, Blue, Blue, Blue, Red, Green]);
        setColor(ledId, ColorRGB);
    }

    requestAnimationFrame(allLedsDifferentColor);

}