/**
 * Created by mathi on 11/05/2017.
 */

var ColorRGB = {r:0,
                g:0,
                b:0};

var DefaultColor = {
    r:50,
    g:50,
    b:50
};

var Red = { r:255,
            g:0,
            b:0};

var myAnimationFunction;
var delayMillis = 500;

//var selectedPlayers=[1,3];
// playerSelection(players, selectedPlayers);



function playerSelection(players, selectedPlayers) {

    //myAnimationFunction = setInterval(function(){ animationPlayerSelection() }, delayMillis);
    //requestAnimationFrame(animationPlayerSelection);

    console.log("playerselection");

    for (var i=0; i<selectedPlayers.length; i++) {
        for (var j=0; j<numberOfLeds; j++) {
            // ledId = j + selectedPlayers[i]*numberOfLeds | j correspond au numéro de la led par rapport au centre
            var ledId = j + selectedPlayers[i]*numberOfLeds;
            ColorRGB = Red;
            setColor(ledId, ColorRGB);
        }
    }

}


function animationPlayerSelection() {

    console.log("read");

    var temporaryPlayer = Math.floor(Math.random()*players);

                for (var j=0; j<numberOfLeds; j++) {
                    var ledId = j + temporaryPlayer*numberOfLeds;
                    ColorRGB = Red;
                    setColor(ledId, ColorRGB);
                }

}

function animationFromCenterToBorder() {

// la variable j ne doit pas être dans une boucle mais doit incrémenter à chaque lecture de la fonction
    for (var j=0; j<numberOfLeds; j++) {
        for (var i=0; 0<players; i++) {
            var ledId = j + players*numberOfLeds;
            ColorRGB = Red;
            setColor(ledId, ColorRGB);
        }

    }

}


