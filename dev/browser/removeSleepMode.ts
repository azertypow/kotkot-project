/**
 * Created by azertypow on 07/05/2017.
 */

/// <reference path="./NoSleep.d.ts" />

declare let NoSleep:any;

export default class removeSleepMode{
    static run(){
        let noSleep: NoSleep = new NoSleep();
        noSleep.enable();
        console.log("sleep cut");
    }
}