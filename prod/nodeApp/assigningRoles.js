"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AssigningRoles {
    static generate(rules) {
        let allRolesAssigned = [];
        const numberOfRules = rules.length;
        console.log(`avant : ${numberOfRules}`);
        for (let i = 1; i < numberOfRules + 1; i++) {
            const maxRandom = rules.length;
            console.log(maxRandom);
            const randomArrayIndex = this.getRandomInt(0, maxRandom);
            console.log(randomArrayIndex);
            let roleInCreation = {
                playerIndex: i,
                playerRole: rules[randomArrayIndex],
            };
            console.log(roleInCreation);
            rules.splice(randomArrayIndex, 1);
            console.log(rules);
            allRolesAssigned.push(roleInCreation);
        }
        console.log(`après : ${numberOfRules}`);
        return allRolesAssigned;
    }
    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
exports.default = AssigningRoles;
