/**
 * Created by mathi on 04/06/2017.
 */

var dataJoueurs = [
    {
        "index":0,
        "ministre":"education",
        "statut":"Progressiste"
    },
    {
        "index":1,
        "emplacement":"industrie",
        "nom":"Ministre de l'Industrie",
        "role":"Cyborg"
    },
    {
        "index":2,
        "ministre":"justice",
        "statut":"Progressiste"
    },
    {
        "index":3,
        "ministre":"information",
        "statut":"Progressiste"
    },
    {
        "index":4,
        "ministre":"communication",
        "statut":"Humaniste"
    },
    {
        "index":5,
        "ministre":"sante",
        "statut":"Cyborg"
    },
    {
        "index":6,
        "ministre":"travail",
        "statut":"Humaniste"
    },
    {
        "index":7,
        "ministre":"armee",
        "statut":"Humaniste"
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
// reveleUnRole(rolesJoueurs, 0);

function reveleUnRole(tableauDesRoles, numeroDuJoueur) {

    var emplacement = rolesJoueurs[numeroDuJoueur].emplacement;
    var statut = (rolesJoueurs[numeroDuJoueur].statut).toLowerCase();

    var ministre = document.querySelector('['+ emplacement +']')


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
   }

}