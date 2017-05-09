/**
 * Created by azertypow on 09/05/2017.
 */

/// <reference path="../typescriptDeclaration/RoleAssigned.d.ts" />

export default class AssigningRoles {
    public static generate(rules: Array<string>): Array<RoleAssigned>{

        let allRolesAssigned: Array<RoleAssigned> = [];
        const numberOfRules: number = rules.length;
        console.log(`avant : ${numberOfRules}`);

        for(let i: number = 1; i < numberOfRules + 1; i++){
            const maxRandom = rules.length;
            console.log(maxRandom);
            const randomArrayIndex: number = this.getRandomInt(0, maxRandom);
            console.log(randomArrayIndex);
            let roleInCreation: RoleAssigned = {
                playerIndex: i,
                playerRole: rules[randomArrayIndex],
            };
            console.log(roleInCreation);

            // supprimer le role pris
            rules.splice(randomArrayIndex, 1);
            console.log(rules);

            // ajouter le role en creation a la liste des role
            allRolesAssigned.push(roleInCreation);
        }

        console.log(`après : ${numberOfRules}`);

        return allRolesAssigned;
    }

    private static getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}