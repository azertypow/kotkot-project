/**
 * Created by azertypow on 06/06/2017.
 */

import SocketClientApp from "./socketClientApp"

export default class PlaySound{

    // jouer un fichier audio
    public static playSound(soundName: string, serverCallback: string) {

        // récupérer ellement audio
        const sound: HTMLAudioElement = <HTMLAudioElement>document.querySelector(`[data-name='${soundName}']`);

        // le jouer
        sound.play();

        // signaler la fin d'un son
        sound.onended = function() {
            console.log("fini");
            SocketClientApp.socket.emit(serverCallback);
        }
    }

    // preload des sounds
    public static preloadSounds() {

        for (let i: number=0; i<this.sounds.length; i++) {
            // création de la balise audio
            let audiotag: HTMLAudioElement = document.createElement('audio');
            audiotag.preload = "auto";
            document.body.appendChild(audiotag);

            // importation de la source
            let source: HTMLSourceElement = document.createElement('source');

            source.src = "./audiofiles/" + this.sounds[i];
            source.type = "audio/mpeg";
            audiotag.dataset.name = this.sounds[i];
            audiotag.appendChild(source);
        }

    }

    private static sounds: Array<string> = [
        "dataJoueurs/nomsJoueurs/education.wav",
        "dataJoueurs/nomsJoueurs/industrie.wav",
        "dataJoueurs/nomsJoueurs/justice.wav",
        "dataJoueurs/nomsJoueurs/information.wav",
        "dataJoueurs/nomsJoueurs/communication.wav",
        "dataJoueurs/nomsJoueurs/sante.wav",
        "dataJoueurs/nomsJoueurs/travail.wav",
        "dataJoueurs/nomsJoueurs/armee.wav",
        "dataJoueurs/roles/progressiste.wav",
        "dataJoueurs/roles/humaniste.wav",
        "dataJoueurs/roles/cyborg.wav",
        "dataJoueurs/liaison/est.wav",
        "dataJoueurs/liaison/le.wav",
        "pres_intro/narration/connection_ok.wav",
        "pres_intro/narration/histoire.wav",
        "pres_intro/bonus/trop_long/0.wav",
        "pres_intro/bonus/trop_long/1.wav",
        "pres_intro/bonus/trop_long/2.wav",
        "intro/narration/avertissement.wav",
        "intro/narration/roles/progressiste.wav",
        "intro/narration/roles/humaniste.wav",
        "intro/narration/roles/cyborg.wav",
        "votation/narration/intro.wav",
        "votation/narration/premier_tour.wav",
        "votation/narration/tour_standard/vote_de_confiance/ministre_actif.wav",
        "votation/narration/tour_standard/vote_de_confiance/delegue.wav",
        "votation/narration/tour_standard/vote_de_confiance/autres_joueurs.wav",
        "votation/narration/tour_standard/vote_de_confiance/tous/rejet.wav",
        "votation/narration/tour_standard/vote_de_confiance/tous/nouveau/0.wav",
        "votation/narration/tour_standard/vote_de_confiance/tous/nouveau/1.wav",
        "votation/narration/tour_standard/vote_de_confiance/tous/nouveau/2.wav",
        "votation/narration/tour_standard/vote_de_confiance/tous/nouveau/3.wav",
        "votation/narration/tour_standard/vote_de_confiance/tous/nouveau/4.wav",
        "votation/narration/tour_standard/vote_de_confiance/tous/nouveau/5.wav",
        "votation/narration/tour_standard/vote_de_confiance/tous/nouveau/6.wav",
        "votation/narration/tour_standard/vote_de_confiance/tous/nouveau/7.wav",
        "votation/narration/tour_standard/choix_lois_ministre/ministre_actif.wav",
        "votation/narration/tour_standard/choix_lois_ministre/delegue.wav",
        "votation/narration/tour_standard/choix_lois_ministre/autres_joueurs.wav",
        "votation/narration/tour_standard/choix_loi_delegue/ministre_actif_et_autres.wav",
        "votation/narration/tour_standard/choix_loi_delegue/delegue.wav",
        "votation/narration/tour_standard/bien_recu.wav",
        "votation/narration/tour_standard/annonce_loi/progressiste.wav",
        "votation/narration/tour_standard/annonce_loi/humaniste.wav",
        "votation/narration/tour_standard/choix_du_prochain/delegue.wav",
        "votation/narration/tour_standard/choix_du_prochain/autres_joueurs.wav",
        "votation/narration/tour_standard/choix_du_prochain/conclusion/0.wav",
        "votation/narration/tour_standard/choix_du_prochain/conclusion/1.wav",
        "votation/narration/tour_standard/choix_du_prochain/conclusion/2.wav",
        "votation/narration/tour_standard/choix_du_prochain/conclusion/3.wav",
        "votation/narration/tour_standard/choix_du_prochain/conclusion/4.wav",
        "votation/narration/tour_standard/choix_du_prochain/conclusion/5.wav",
        "votation/narration/tour_standard/choix_du_prochain/conclusion/6.wav",
        "votation/narration/tour_standard/choix_du_prochain/conclusion/7.wav",
        "elimination/narration/premier_tour.wav",
        "elimination/narration/tour_standard/intro.wav",
        "elimination/narration/tour_standard/qui_eliminer.wav",
        "elimination/narration/tour_standard/elimination_normale/0.wav",
        "elimination/narration/tour_standard/elimination_normale/1.wav",
        "elimination/narration/tour_standard/elimination_normale/2.wav",
        "elimination/narration/tour_standard/elimination_normale/3.wav",
        "elimination/narration/tour_standard/elimination_normale/4.wav",
        "elimination/narration/tour_standard/elimination_normale/5.wav",
        "elimination/narration/tour_standard/elimination_normale/6.wav",
        "elimination/narration/tour_standard/elimination_normale/7.wav",
        "elimination/narration/tour_standard/egalite/deuxieme.wav",
        "elimination/narration/tour_standard/egalite/elimination/0.wav",
        "elimination/narration/tour_standard/egalite/elimination/1.wav",
        "elimination/narration/tour_standard/egalite/elimination/2.wav",
        "elimination/narration/tour_standard/egalite/elimination/3.wav",
        "elimination/narration/tour_standard/egalite/elimination/4.wav",
        "elimination/narration/tour_standard/egalite/elimination/5.wav",
        "elimination/narration/tour_standard/egalite/elimination/6.wav",
        "elimination/narration/tour_standard/egalite/elimination/7.wav",
        "elimination/narration/tour_standard/passation_du_vote/joueur_elimine.wav",
        "elimination/narration/tour_standard/passation_du_vote/autres_joueurs/0.wav",
        "elimination/narration/tour_standard/passation_du_vote/autres_joueurs/1.wav",
        "elimination/narration/tour_standard/passation_du_vote/autres_joueurs/2.wav",
        "elimination/narration/tour_standard/passation_du_vote/autres_joueurs/3.wav",
        "elimination/narration/tour_standard/passation_du_vote/autres_joueurs/4.wav",
        "elimination/narration/tour_standard/passation_du_vote/autres_joueurs/5.wav",
        "elimination/narration/tour_standard/passation_du_vote/autres_joueurs/6.wav",
        "elimination/narration/tour_standard/passation_du_vote/autres_joueurs/7.wav",
        "elimination/narration/tour_standard/passation_du_vote/annonce_resultat/0.wav",
        "elimination/narration/tour_standard/passation_du_vote/annonce_resultat/1.wav",
        "elimination/narration/tour_standard/passation_du_vote/annonce_resultat/2.wav",
        "elimination/narration/tour_standard/passation_du_vote/annonce_resultat/3.wav",
        "elimination/narration/tour_standard/passation_du_vote/annonce_resultat/4.wav",
        "elimination/narration/tour_standard/passation_du_vote/annonce_resultat/5.wav",
        "elimination/narration/tour_standard/passation_du_vote/annonce_resultat/6.wav",
        "elimination/narration/tour_standard/passation_du_vote/annonce_resultat/7.wav",
        "elimination/narration/tour_standard/message_adieu/0.wav",
        "elimination/narration/tour_standard/message_adieu/1.wav",
        "elimination/narration/tour_standard/message_adieu/2.wav",
        "elimination/narration/tour_standard/message_adieu/3.wav",
        "elimination/narration/tour_standard/message_adieu/4.wav",
        "elimination/narration/tour_standard/message_adieu/5.wav",
        "elimination/narration/tour_standard/message_adieu/6.wav",
        "elimination/narration/tour_standard/message_adieu/7.wav",
        "elimination/bonus/rappel_elimination/0.wav",
        "elimination/bonus/rappel_elimination/1.wav",
        "elimination/bonus/rappel_elimination/2.wav",
        "elimination/bonus/rappel_elimination/3.wav",
        "elimination/bonus/rappel_elimination/4.wav",
        "elimination/bonus/rappel_elimination/5.wav",
        "elimination/bonus/rappel_elimination/6.wav",
        "elimination/bonus/rappel_elimination/7.wav",
        "elimination/bonus/rappel_vote_confiance/0.wav",
        "elimination/bonus/rappel_vote_confiance/1.wav",
        "elimination/bonus/rappel_vote_confiance/2.wav",
        "elimination/bonus/rappel_vote_confiance/3.wav",
        "elimination/bonus/rappel_vote_confiance/4.wav",
        "elimination/bonus/rappel_vote_confiance/5.wav",
        "elimination/bonus/rappel_vote_confiance/6.wav",
        "elimination/bonus/rappel_vote_confiance/7.wav",
        "indices_cyborgs/narration/nom_du_coequipier/0.wav",
        "indices_cyborgs/narration/nom_du_coequipier/1.wav",
        "indices_cyborgs/narration/nom_du_coequipier/2.wav",
        "indices_cyborgs/narration/nom_du_coequipier/3.wav",
        "indices_cyborgs/narration/nom_du_coequipier/4.wav",
        "indices_cyborgs/narration/nom_du_coequipier/5.wav",
        "indices_cyborgs/narration/nom_du_coequipier/6.wav",
        "indices_cyborgs/narration/nom_du_coequipier/7.wav",
        "indices_cyborgs/narration/voisins/un_progressiste.wav",
        "indices_cyborgs/narration/voisins/un_humaniste.wav",
        "indices_cyborgs/narration/voisins/deux_progressistes.wav",
        "indices_cyborgs/narration/voisins/deux_humanistes.wav",
        "indices_cyborgs/narration/vote_loi/humaniste.wav",
        "indices_cyborgs/narration/vote_loi/progressiste.wav",
        "indices_cyborgs/narration/majorite_num/humaniste.wav",
        "indices_cyborgs/narration/majorite_num/progressiste.wav",
        "indices_cyborgs/narration/majorite_num/aucun.wav",
        "indices_cyborgs/narration/majorite_voix/humaniste.wav",
        "indices_cyborgs/narration/majorite_voix/progressiste.wav",
    ];
}