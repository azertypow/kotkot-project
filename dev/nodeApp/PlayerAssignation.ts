/**
 * Created by azertypow on 09/05/2017.
 */

/// <reference path="../typescriptDeclaration/RoleAssigned.d.ts" />

export default class PlayerAssignation {
    public static generate(list: Array<string>): Array<Assignation>{

        let allAssigned: Array<Assignation> = [];
        const numberOfRules: number = list.length;
        console.log(`avant : ${numberOfRules}`);

        for(let i: number = 0; i < numberOfRules; i++){
            const maxRandom = list.length;
            console.log(maxRandom);
            const randomArrayIndex: number = this.getRandomInt(0, maxRandom);
            console.log(randomArrayIndex);
            let roleInCreation: Assignation = {
                playerIndex: i,
                assignation: list[randomArrayIndex],
            };
            console.log(roleInCreation);

            // supprimer le role pris
            list.splice(randomArrayIndex, 1);
            console.log(list);

            // ajouter le role en creation a la liste des role
            allAssigned.push(roleInCreation);
        }

        console.log(`après : ${numberOfRules}`);

        return allAssigned;
    }

    private static getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}