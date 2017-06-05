/**
 * Created by azertypow on 08/05/2017.
 */

interface PlayerData {
    action: {
        emit: string,
        options: string,
    },
    emplacement: string, // ministaire, emplacement sur le plateau "écologie, …"
    nom: string, // phrase avec son emplacement, son affectation "ministre de l'écologie, …"
    role: string, // partie dasn lequel le joueur se trouve "Progressiste | Humaniste | Cyborg"
}