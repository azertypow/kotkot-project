/**
 * Created by azertypow on 08/05/2017.
 */

/// <reference path="../typescriptDeclaration/PlayerData.d.ts" />

export default class Player {
    id: number;
    ipValue: string;
    socketId: string;
    data: PlayerData;

    constructor(id: number, ipValue: string, socketId: string, data: PlayerData){
        this.id = id;
        this.ipValue = ipValue;
        this.socketId = socketId;
        this.data = data;
    }
}