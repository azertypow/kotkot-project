/**
 * Created by mathi on 11/05/2017.
 */

var ColorRGB =      {r:0, g:0, b:0};
var DefaultColor =  {r:50, g:50, b:50};
var Red =           { r:255, g:0, b:0};
var Blue =          { r:0, g:0, b:255};
var Cyan =          { r:0, g:255, b:255};
var Yellow =        { r:255, g:255, b:0};
var Green =         { r:0, g:255, b:0};

var myAnimationFunction;
var delayMillis = 500;


function chooseColor(colors) {

    if (colors.length === 1) {
        return colors;
    }
    else {
        var randomColor = Math.floor(Math.random()*colors.length);
        return colors[randomColor];
    }
}

function playerSelection(players, selectedPlayers) {

    clearLedColor();


    for (var i=0; i<selectedPlayers.length; i++) {
        for (var j=0; j<numberOfLeds; j++) {
            // ledId = j + selectedPlayers[i]*numberOfLeds | j correspond au numéro de la led par rapport au centre
            var ledId = j + selectedPlayers[i]*numberOfLeds;
            ColorRGB = Blue;
            setColor(ledId, ColorRGB);
        }
        console.log("i " + i);
    }

    console.log("playerSelection finish");


}

function animationPlayerSelection() {

    var temporaryPlayer = Math.floor(Math.random()*players);

                for (var j=0; j<numberOfLeds; j++) {
                    var ledId = j + temporaryPlayer*numberOfLeds;
                    ColorRGB = chooseColor([Blue, Blue, Blue, Blue, Blue, Blue, Red, Cyan, Yellow, Green]);
                    setColor(ledId, ColorRGB);
                }

}



