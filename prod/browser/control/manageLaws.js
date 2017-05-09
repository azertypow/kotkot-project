/**
 * Created by mathi on 09/05/2017.
 */

var json = {

    loisJ1:[
        {   text: "Je te propose trois lois de Gauche",
            buttons: [
                "Proposer deux lois de gauche",
            ]
        },
        {   text: "Je te propose deux lois de Gauche et une loi de Droite",
            buttons: [
                "Proposer deux lois de gauche",
                "Proposer une loi de gauche et une loi de droite"
            ]
        },
        {   text: "Je te propose une loi Gauche et deux lois de Droite",
            buttons: [
                "Proposer deux lois de droite",
                "Proposer une loi de gauche et une loi de droite"
            ]
        },
        {   text: "Je te propose trois lois de Droite",
            buttons: [
                "Proposer deux lois de droite",
            ]
        },
    ],

    loisJ2:[
        {   text: "L'autre joueur te propose deux lois de Gauche",
            buttons: [
                "Valider une loi de gauche",
            ]
        },
        {   text: "L'autre joueur te propose une loi de Gauche et une loi de Droite",
            buttons: [
                "Valider une loi de gauche",
                "Valider une loi de droite",
            ]
        },
        {   text: "L'autre joueur te propose deux lois de Droite",
            buttons: [
                "Valider une loi de droite",
            ]
        },
    ],

    annonces:[
        {   text: "Une loi vient d'être votée. Vous pouvez maintenant la valider ou la rejeter. Souhaitez-vous la valider ?",
            buttons: [
                "oui",
                "non"]
        },
        {text: "La loi a été acceptée"},
        {text: "La loi a été refusée"},
        {text: "C'est une loi de Gauche"},
        {text: "C'est une loi de Droite"},
    ],

    narration:[
        {text: "Bienvenue dans le jeu. Vous allez devoir voter assez de lois pour faire gagner votre parti. Vous serez amené à évincer des joueurs au cours de la partie. Méfiez-vous, une fois éliminés, ces joueurs peuvent donner leur droit de vote à un joueur restant. Attention, deux cyborgs se sont glissés dans chaque équipe, leur but est de prendre le pouvoir en obtenant le droit de vote le plus puissant."},
        {text: "Vous appartenez au Parti de Gauche. Votre but est de faire passer 5 lois de gauche ou d'éliminer tous les membres du parti de Droite. Attention, les cyborgs ne doivent pas prendre le pouvoir."},
        {text: "Vous appartenez au Parti de Droite. Votre but est de faire passer 5 lois de droite ou d'éliminer tous les membres du parti de Gauche. Attention, les cyborgs ne doivent pas prendre le pouvoir."},
        {text: "Vous appartenez au Parti de Gauche. Vous êtes un cyborg. Votre but est d'obtenir le droit de vote le plus puissant."},
        {text: "Vous appartenez au Parti de Droite. Vous êtes un cyborg. Votre but est d'obtenir le droit de vote le plus puissant."},
    ],

    cyborg:[
        {text: "La loi qui vient d'être refusée était de Gauche"},
        {text: "La loi qui vient d'être refusée était de Droite"},
        {text: "Trois membres du parti de gauche son côte à côte"},
        {text: "Trois membres du parti de droite son côte à côte"},
        {text: "Deux membres du parti de gauche son face à face"},
        {text: "Deux membres du parti de droite son face à face"},
        {text: "La personne qui vient d'être éliminée était de Droite"},
        {text: "La personne qui vient d'être éliminée était de Gauche"},
        {text: "La personne qui vient d'être éliminée a donné sa voix à un membre du parti de Gauche"},
        {text: "La personne qui vient d'être éliminée a donné sa voix à un membre du parti de Droite"},
        {text: "Il reste trois membres du parti de Gauche"},
        {text: "Il reste trois membres du parti de Droite"},
        {text: "Le cyborg adverse a été éliminé"},
        {text: "Le cyborg adverse a plus d'une voix"},
        {text: "Tu es proche de l'autre cyborg"},
    ],

    humain: [
        {text: "Il fait beau dehors ?", buttons: ["oui", "non"]},
        {text: "tous se passe bien?", buttons: ["oui", "non"]},
        {text: "Il fait beau dehors ?", buttons: ["oui", "non"]},
        {text: "Votre partie est en minorité, il faudrait se remuer"},
        {text: "Votre partie est en minorité, mais vous avez plus de poids dans le vote"},
    ],

};

// il faut une variable coefficient de vote dans la class Player -
// est-ce que le coefficient de vote ne compte que pour les éliminations ou aussi pour l'acceptation d'un vote ?

// il faut se servir des bandes de LED + du son éventuellement pour caractériser le temps de vote et avoir une "deadline" après laquelle on ne peut plus voter (20 secondes par exemple)
// du coup ne pas voter peut peut-être devenir une stratégie ?

function eliminatePlayer() {

    // pour la version maître du jeu il faudrait recevoir le numéro de joueur que chaque joueur souhaite éliminer + son coefficient de vote

    // récupère les votes de chaque joueur (le numéro de la personne qu'il souhaite éliminer)
    // les multiplie par le coefficient du joueur qui vient de voter

}