// /**
//  * Created by azertypow on 08/05/2017.
//  */
//
// var json = {
//
//     loisJ1:[
//         "Je te propose trois lois de Gauche",
//         "Je te propose deux lois de Gauche et une loi de Droite",
//         "Je te propose une loi Gauche et deux lois de Droite",
//         "Je te propose trois lois de Droite",
//         "Premier choix : veux-tu proposer une loi de Gauche ?",
//         "Premier choix : veux-tu proposer une loi de Droite ?",
//         "Deuxième choix : veux-tu proposer une loi de Gauche ?",
//         "Deuxième choix : veux-tu proposer une loi de Droite ?",
//         "Choix validé",
//         "Choix refusé, cette option n'est pas disponible"
//     ],
//
//     loisJ2:["L'autre joueur te propose deux lois de Gauche",
//         "L'autre joueur te propose une loi de Gauche et une loi de Droite",
//         "L'autre joueur te propose deux lois de Droite",
//         "Veux-tu proposer une loi de Gauche ?",
//         "Veux-tu proposer une loi de Droite ?",
//         "Choix validé",
//         "Choix refusé, cette option n'est pas disponible"
//     ],
//
//     narration:[
//         "Bienvenue dans le jeu",
//         "Vous appartenez au Parti de Gauche. Votre but est de...",
//         "Vous appartenez au Parti de Droite. Votre but est de..."
//     ]
//
//
// };
//
//
//
// var singleControl = document.getElementsByClassName("control");
// var propositions = document.getElementsByClassName("proposition");
//
// for (var i=0; i<singleControl.length; i++) {
//     singleControl[i].addEventListener('click', displayPropositions);
// }
//
//
// for (var j=0; j<propositions.length; j++) {
//     propositions[j].addEventListener('click', sendProposition);
// }
//
//
// // Envoie la proposition choisie par le maître du jeu
// function sendProposition(e) {
//
// console.log(e.target.textContent);
//
// }
//
//
// // Affiche au maître du jeu les propositions correspondant à la catégorie sélectionnée
// function displayPropositions(e){
//
//     // pour pas que la fonction se lance quand on clique sur les enfants
//     if((e.target.classList[0]) !== "control") {
//         // si on clique sur une proposition on l'envoie
//         if ((e.target.classList[0]) === "proposition") {
//             sendProposition(e);
//             return;
//         // si l'élément n'est ni l'élément parent, ni une proposition, ce n'est pas normal
//         } else {
//             console.log("wrong element - l'élément n'a pas la class 'control'");
//             return;
//         }
//     }
//
//     var currentElement = e.target;
//     var currentClass = e.target.classList[1]; // récupère la 2e class correspondant à l'élément sélectionné
//
//
//     // si il y a des déjà des propositions affichées dans une autre catégorie, on les enlève
//     if (document.getElementById('proposition') !== null) {
//         var prop = document.getElementById('proposition');
//         prop.parentNode.removeChild(prop);
//     }
//
//     var propositions = document.createElement("div");
//     propositions.setAttribute("id", "proposition");
//     currentElement.appendChild(propositions);
//
//
//     // on affiche la liste de la class qui vient d'être cliquée
//     for (var i=0; i<json[currentClass].length; i++) {
//         var sentence = document.createElement("p");
//         sentence.setAttribute("class", "proposition" + " proposition-" + i);
//         sentence.textContent = json[currentClass][i];
//         propositions.appendChild(sentence);
//     }
//
//     socket.emit('control-click', {
//          name: "control"
//     });
// }
//
//
//
