/**
 * Created by mathi on 15/05/2017.
 */

function initAllLedsSameColor(gradientColors) {

    console.log(gradientColors);

    var i = 0;
    var firstColor = gradientColors[i];
    var secondColor = gradientColors[i+1];
    var thirdColor = gradientColors[i+2];
    var currentColor = gradientColors[i];
    var Diff = {r:0, g:0, b:0};
    var divider = 50;

    calcColorDiff(firstColor, secondColor, Diff);

    allLedsSameColor(firstColor, secondColor, thirdColor, currentColor, Diff, divider);

}

function calcColorDiff(firstColor, secondColor, Diff) {

    Diff.r = Math.abs(firstColor.r - secondColor.r); // Math.abs() permet d'obtenir tout le temps un nombre positif
    Diff.g = Math.abs(firstColor.g - secondColor.g);
    Diff.b = Math.abs(firstColor.b - secondColor.b);

    return Diff;

}


function allLedsSameColor(firstColor, secondColor, thirdColor, currentColor, Diff, divider) {

    // si le rouge/vert/bleu de la 1ere couleur est plus élevé que celui de la 2e, alors on fait baisser la valeur et inversement
    if (firstColor.r !== secondColor.r) {
        currentColor.r = (firstColor.r > secondColor.r) ? currentColor.r -= Math.floor(Diff.r/divider) : currentColor.r += Math.floor(Diff.r/divider);
    }

    if (firstColor.g !== secondColor.g) {
        currentColor.g = (firstColor.g > secondColor.g) ? currentColor.g -= Math.floor(Diff.g/divider) : currentColor.r += Math.floor(Diff.g/divider);
    }

    if (firstColor.b !== secondColor.b) {
        currentColor.b = (firstColor.b > secondColor.b) ? currentColor.b -= Math.floor(Diff.b/divider) : currentColor.b += Math.floor(Diff.b/divider);
    }

    // /!\ la valeur de Math.floor(Diff.b/divider) peut entraîner des valeurs approximatives
    if (currentColor.r === secondColor.r && currentColor.g === secondColor.g && currentColor.b === secondColor.b) {
        firstColor = secondColor;
        secondColor = thirdColor;
        calcColorDiff(firstColor, secondColor, Diff);
    }


    for (var ledId=0; ledId<totalNumberOfLeds; ledId++) {
        setColor(ledId, currentColor);
    }

    requestAnimationFrame(function() {
        allLedsSameColor(firstColor, secondColor, thirdColor, currentColor, Diff, divider);
    })

}