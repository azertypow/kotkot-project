/**
 * Created by mathi on 04/06/2017.
 */

var dataJoueurs = [
    {
        "index":1,
        "emplacement":"education",
        "nom":"Ministre de l'Education",
        "role":"Progressiste"
    },
    {
        "index":1,
        "emplacement":"industrie",
        "nom":"Ministre de l'Industrie",
        "role":"Cyborg"
    },
    {
        "index":2,
        "emplacement":"justice",
        "nom":"Ministre de la Justice",
        "role":"Progressiste"
    },
    {
        "index":3,
        "emplacement":"information",
        "nom":"Ministre de l'Information",
        "role":"Progressiste"
    },
    {
        "index":4,
        "emplacement":"communication",
        "nom":"Ministre de la Communication",
        "role":"Humaniste"
    },
    {
        "index":5,
        "emplacement":"sante",
        "nom":"Ministre de la Santé",
        "role":"Cyborg"
    },
    {
        "index":6,
        "emplacement":"travail",
        "nom":"Ministre du Travail",
        "role":"Humaniste"
    },
    {
        "index":7,
        "emplacement":"armee",
        "nom":"Ministre de l'Armée",
        "role":"Humaniste"
    }
];

var sounds = [
    "education",
    "industrie",
    "justice",
    "information",
    "communication",
    "sante",
    "travail",
    "armee",
    "progressiste",
    "humaniste",
    "cyborg",
    "est",
    "le"
];


preloadSounds(sounds);
reveleUnRole(dataJoueurs, 2);

function reveleUnRole(tableauDesRoles, numeroDuJoueur) {

    var emplacement = tableauDesRoles[numeroDuJoueur].emplacement;
    var playerrole = (tableauDesRoles[numeroDuJoueur].role).toLowerCase();

    console.log(playerrole);

    var ministre = document.querySelector("[data-name='"+ emplacement +"']");
    var role = document.querySelector("[data-name='"+ playerrole + "']");

    console.log(role);

    var le = document.querySelector("[data-name='le']");
    var est = document.querySelector("[data-name='est']");

    var test = document.querySelector("[data-name='bienvenue']");

    var phrase = [le, ministre, est, role];

    console.log(phrase);

    phrase[0].play();
    phrase[0].onended = function() {
        phrase[1].play();
        phrase[1].onended = function() {
            phrase[2].play();
            phrase[2].onended = function() {
                phrase[3].play();
            }
        }
    }
}




// preload des sounds
function preloadSounds(sounds) {

   for (var i=0; i<sounds.length; i++) {
       // création de la balise audio
       var audiotag = document.createElement('audio');
       audiotag.preload = "auto";
       document.body.appendChild(audiotag);

       // importation de la source
       var source = document.createElement('source');
       source.src = "../audiofiles/" + sounds[i] + ".mp3";
       source.type = "audio/mpeg";
       audiotag.dataset.name = sounds[i];
       audiotag.appendChild(source);
       source.addEventListener("load", test);
   }

}








// function preloadAudio(url) {
//     console.log(url);
//     var audio = new Audio();
//     // once this file loads, it will call loadedAudio()
//     // the file will be kept by the browser as cache
//     audio.addEventListener('canplaythrough', loadedAudio, false);
//     audio.src = url;
// }
//
// var loaded = 0;
// function loadedAudio() {
//     // this will be called every time an audio file is loaded
//     // we keep track of the loaded files vs the requested files
//     loaded++;
//     if (loaded === audioFiles.length){
//         // all have loaded
//         init();
//     }
// }
//
// var player = document.getElementById('player');
// function play(index) {
//     player.src = audioFiles[index];
//     player.play();
// }
//
// function init() {
//     // do your stuff here, audio has been loaded
//     // for example, play all files one after the other
//     var i = 0;
//     // once the player ends, play the next one
//     player.onended = function() {
//         i++;
//         if (i >= audioFiles.length) {
//             // end
//             return;
//         }
//         play(i);
//     };
//     // play the first file
//     play(i);
// }
//
// // we start preloading all the audio files
// for (var i in audioFiles) {
//     preloadAudio(audioFiles[i]);
// }