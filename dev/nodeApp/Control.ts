/**
 * Created by azertypow on 09/05/2017.
 */

export default class Control {
    ipValue: string;
    socketId: string;

    constructor(ipValue: string, socketId: string){
        this.ipValue = ipValue;
        this.socketId = socketId;
    }
}