"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Assignation {
    static generate(list) {
        let allRolesAssigned = [];
        const numberOfRules = list.length;
        console.log(`avant : ${numberOfRules}`);
        for (let i = 0; i < numberOfRules; i++) {
            const maxRandom = list.length;
            console.log(maxRandom);
            const randomArrayIndex = this.getRandomInt(0, maxRandom);
            console.log(randomArrayIndex);
            let roleInCreation = {
                playerIndex: i,
                playerRole: list[randomArrayIndex],
            };
            console.log(roleInCreation);
            list.splice(randomArrayIndex, 1);
            console.log(list);
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
exports.default = Assignation;
