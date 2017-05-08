/**
 * Created by azertypow on 08/05/2017.
 */

/// <reference types="mustache" />

import socketControlApp from "./socketControlApp";
import removeSleepMode from "../removeSleepMode";

// remove sleep mode
removeSleepMode.run();


socketControlApp.run();

// const players: HTMLElement = <HTMLElement> document.querySelector("#players");
// const playersPattern: string = players.innerHTML;
//
// console.log(playersPattern);
//
// let patern: Object = {
//     "players" : [
//         {
//             "range": "1",
//             "ip": "null",
//             "current-rule": "empty"
//         },
//         {
//             "range": "2",
//             "ip": "null",
//             "current-rule": "empty"
//         },
//         {
//             "range": "3",
//             "ip": "null",
//             "current-rule": "empty"
//         },
//         {
//             "range": "4",
//             "ip": "null",
//             "current-rule": "empty"
//         },
//         {
//             "range": "5",
//             "ip": "null",
//             "current-rule": "empty"
//         },
//     ]
// };
//
// let renderPlayers: string = Mustache.render(playersPattern, patern);
//
// players.innerHTML = renderPlayers;
//
// console.log(renderPlayers);