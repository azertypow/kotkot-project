"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssigningRoles = (function () {
    function AssigningRoles() {
    }
    AssigningRoles.generate = function (rules) {
        var allRolesAssigned = [];
        var numberOfRules = rules.length;
        console.log("avant : " + numberOfRules);
        for (var i = 1; i < numberOfRules + 1; i++) {
            var maxRandom = rules.length;
            console.log(maxRandom);
            var randomArrayIndex = this.getRandomInt(0, maxRandom);
            console.log(randomArrayIndex);
            var roleInCreation = {
                playerIndex: i,
                playerRole: rules[randomArrayIndex],
            };
            console.log(roleInCreation);
            rules.splice(randomArrayIndex, 1);
            console.log(rules);
            allRolesAssigned.push(roleInCreation);
        }
        console.log("apr\u00E8s : " + numberOfRules);
        return allRolesAssigned;
    };
    AssigningRoles.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };
    return AssigningRoles;
}());
exports.default = AssigningRoles;
