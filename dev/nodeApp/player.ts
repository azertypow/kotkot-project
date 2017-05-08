/**
 * Created by azertypow on 08/05/2017.
 */

export default class Player {
    id: number;
    ipValue: string;
    socketId: string;

    constructor(id: number, ipValue: string, socketId: string){
        this.id = id;
        this.ipValue = ipValue;
        this.socketId = socketId;
    }
}