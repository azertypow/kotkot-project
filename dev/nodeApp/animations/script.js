/**
 * Created by mathi on 13/04/2017.
 */



setup();

function setup() {
    drawLEDs();
}


function drawLEDs() {

    var tailleRayon = 100;
    var maxValue = numberOfLeds*spaceBetweenLeds + tailleRayon;
    //var
    var x = Math.floor(window.innerWidth/2)-250;
    var y = Math.floor(window.innerHeight/2)+200;

    var currentId = 0;

    for (var i=0; i<players; i++)  {
        for (var rayon = tailleRayon; rayon<maxValue; rayon+=spaceBetweenLeds) { // rayon correspond à l'éloigement au milieu
            var aPlayer = document.createElement("div");
            aPlayer.setAttribute("class", "leds");
            aPlayer.setAttribute("id", "led-" + currentId);

            // * (Math.PI / 180) sert à convertir les degrés en radians
            var posX = x+Math.cos(i*360/(players) * (Math.PI / 180)) * rayon;
            var posY = y+Math.sin(i*360/(players) * (Math.PI / 180)) * rayon;

            aPlayer.style.top = posX + "px";
            aPlayer.style.left = posY + "px";

            document.body.appendChild(aPlayer);
            currentId++;
        }


    }


}