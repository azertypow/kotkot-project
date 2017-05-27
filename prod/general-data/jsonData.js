"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JsonData {
}
JsonData.rulesAndButtons = {
    loisJ1: [
        { text: "Je te propose trois lois de Gauche",
            buttons: [
                "Proposer deux lois de gauche",
            ]
        },
        { text: "Je te propose deux lois de Gauche et une loi de Droite",
            buttons: [
                "Proposer deux lois de gauche",
                "Proposer une loi de gauche et une loi de droite"
            ]
        },
        { text: "Je te propose une loi Gauche et deux lois de Droite",
            buttons: [
                "Proposer deux lois de droite",
                "Proposer une loi de gauche et une loi de droite"
            ]
        },
        { text: "Je te propose trois lois de Droite",
            buttons: [
                "Proposer deux lois de droite",
            ]
        },
    ],
    loisJ2: [
        { text: "L'autre joueur te propose deux lois de Gauche",
            buttons: [
                "Valider une loi de gauche",
            ]
        },
        { text: "L'autre joueur te propose une loi de Gauche et une loi de Droite",
            buttons: [
                "Valider une loi de gauche",
                "Valider une loi de droite",
            ]
        },
        { text: "L'autre joueur te propose deux lois de Droite",
            buttons: [
                "Valider une loi de droite",
            ]
        },
    ],
    annonces: [
        { text: "Une loi vient d'être votée. Vous pouvez maintenant la valider ou la rejeter. Souhaitez-vous la valider ?",
            buttons: [
                "oui",
                "non"
            ]
        },
        { text: "La loi a été acceptée", buttons: [] },
        { text: "La loi a été refusée", buttons: [] },
        { text: "C'est une loi de Gauche", buttons: [] },
        { text: "C'est une loi de Droite", buttons: [] },
    ],
    narration: [
        { text: "Bienvenue dans le jeu. Vous allez devoir voter assez de lois pour faire gagner votre parti. Vous serez amené à évincer des joueurs au cours de la partie. Méfiez-vous, une fois éliminés, ces joueurs peuvent donner leur droit de vote à un joueur restant. Attention, deux cyborgs se sont glissés dans chaque équipe, leur but est de prendre le pouvoir en obtenant le droit de vote le plus puissant.", buttons: [] },
        { text: "Vous appartenez au Parti de Gauche. Votre but est de faire passer 5 lois de gauche ou d'éliminer tous les membres du parti de Droite. Attention, les cyborgs ne doivent pas prendre le pouvoir.", buttons: [] },
        { text: "Vous appartenez au Parti de Droite. Votre but est de faire passer 5 lois de droite ou d'éliminer tous les membres du parti de Gauche. Attention, les cyborgs ne doivent pas prendre le pouvoir.", buttons: [] },
        { text: "Vous appartenez au Parti de Gauche. Vous êtes un cyborg. Votre but est d'obtenir le droit de vote le plus puissant.", buttons: [] },
        { text: "Vous appartenez au Parti de Droite. Vous êtes un cyborg. Votre but est d'obtenir le droit de vote le plus puissant.", buttons: [] },
    ],
    cyborg: [
        { text: "La loi qui vient d'être refusée était de Gauche", buttons: [] },
        { text: "La loi qui vient d'être refusée était de Droite", buttons: [] },
        { text: "Trois membres du parti de gauche son côte à côte", buttons: [] },
        { text: "Trois membres du parti de droite son côte à côte", buttons: [] },
        { text: "Deux membres du parti de gauche son face à face", buttons: [] },
        { text: "Deux membres du parti de droite son face à face", buttons: [] },
        { text: "La personne qui vient d'être éliminée était de Droite", buttons: [] },
        { text: "La personne qui vient d'être éliminée était de Gauche", buttons: [] },
        { text: "La personne qui vient d'être éliminée a donné sa voix à un membre du parti de Gauche", buttons: [] },
        { text: "La personne qui vient d'être éliminée a donné sa voix à un membre du parti de Droite", buttons: [] },
        { text: "Il reste trois membres du parti de Gauche", buttons: [] },
        { text: "Il reste trois membres du parti de Droite", buttons: [] },
        { text: "Le cyborg adverse a été éliminé", buttons: [] },
        { text: "Le cyborg adverse a plus d'une voix", buttons: [] },
        { text: "Tu es proche de l'autre cyborg", buttons: [] },
    ],
    humain: [
        { text: "Il fait beau dehors ?", buttons: ["oui", "non"] },
        { text: "tous se passe bien?", buttons: ["oui", "non"] },
        { text: "Il fait beau dehors ?", buttons: ["oui", "non"] },
        { text: "Votre parti est en minorité, il faudrait se remuer", buttons: [] },
        { text: "Votre parti est en minorité, mais vous avez plus de poids dans le vote", buttons: [] },
        { text: "Votre parti est en majorité, ne vous reposez pas sur vos lauriers", buttons: [] },
        { text: "Vous devriez vous méfier de votre voisin", buttons: [] },
    ],
};
exports.default = JsonData;
