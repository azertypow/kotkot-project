/**
 * Created by azertypow on 06/06/2017.
 */

import _GLOBAL from "../_GLOBAL"
import Intro from "./Intro"

export default class ReponseAuCasques{
    private static headphonesPlugged: number = 0;

    static onCasquePlugged(){
        this.headphonesPlugged ++;

        if(this.headphonesPlugged === _GLOBAL.numberOfPlayers){
            console.log("tous les casques sont branché!");

            // lancer la phase d'intro
            Intro.run();
        }
    }
}