/**
 * Created by mathi on 11/05/2017.
 */

function setColor(ledId, ColorRGB) {

    var currentLed = document.getElementById("led-" + ledId);
    currentLed.style.background = "rgb(" + ColorRGB.r + "," + ColorRGB.g + "," + ColorRGB.b + ")";


}


function clearLedColor() {

    counter++;

    if(counter%30 === 0) {
        console.log("clear");
    }

    var totalLedNumber = document.getElementsByClassName("leds");

    console.log("totalnumber " + totalLedNumber.length);

    for (var i=0; i<totalLedNumber.length; i++) {
        // totalLedNumber[i].style.background = "rgb(" + DefaultColor.r + "," + DefaultColor.g + "," + DefaultColor.b + ")";
        totalLedNumber[i].style.background = "#333";
    }

}

