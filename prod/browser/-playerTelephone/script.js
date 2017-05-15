/**
 * Created by mathi on 15/05/2017.
 */

// generateLaws(3);

function generateLaws(nbCards) {

    var lawType = ["Humaniste", "Progressiste"];
    var lawsBlock = document.getElementById('laws');

    lawsBlock.innerHTML = "";

    for (var i=0; i<nbCards; i++) {
        var index = Math.floor(Math.random()*lawType.length);
        var cardType = lawType[index];
        var oneLaw = document.createElement("div");
        oneLaw.setAttribute("class", "law " + cardType.toLowerCase());
        lawsBlock.appendChild(oneLaw);
        var lawContent = document.createElement("p");
        lawContent.textContent = "Loi " + cardType;
        oneLaw.appendChild(lawContent);
    }



}