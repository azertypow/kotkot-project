/**
 * Created by mathi on 13/04/2017.
 */

var nombreDeJoueurs = 5;
var divisionJauge = 5;

setup();

function setup() {
    drawLEDs();
    drawJauges();
}

function augmenteJauge(equipe) {

    var currentJauge = document.getElementById(equipe);

    var augmentation = document.createElement("div");
    augmentation.style.width = "100%";
    augmentation.style.height = Math.floor((currentJauge.offsetHeight)/divisionJauge) + "px";
    augmentation.style.backgroundColor = "#0f0";
    currentJauge.appendChild(augmentation);

}

function drawJauges() {

    var jaugePutscher = document.createElement("div");
    var jaugeMinistre = document.createElement("div");

    jaugeMinistre.setAttribute("class", "jauge");
    jaugeMinistre.setAttribute("id", "jaugeMinistre");
    jaugePutscher.setAttribute("class", "jauge");
    jaugePutscher.setAttribute("id", "jaugePutscher");

    jaugeMinistre.style.borderColor = "#00f";
    jaugePutscher.style.borderColor = "#f00";

    document.body.appendChild(jaugePutscher);
    document.body.appendChild(jaugeMinistre);

}

function drawLEDs() {

    var rayon = 50;
    var x = Math.floor(window.innerWidth/2)-rayon*2;
    var y = Math.floor(window.innerHeight/2);

    for (var i=0; i<nombreDeJoueurs; i++)  {
        for (rayon = 50; rayon<200; rayon+=20) {
            var aPlayer = document.createElement("div");
            aPlayer.setAttribute("class", "leds " + "leds-" + i);

            // * (Math.PI / 180) sert à convertir les degrés en radians
            var posX = x+Math.cos(i*360/(nombreDeJoueurs) * (Math.PI / 180)) * rayon;
            var posY = y+Math.sin(i*360/(nombreDeJoueurs) * (Math.PI / 180)) * rayon;

            aPlayer.style.top = posX + "px";
            aPlayer.style.left = posY + "px";

            document.body.appendChild(aPlayer);
        }


    }


}