/**
 * Created by azertypow on 03/06/2017.
 */

export let messages: Messages;
export let warnings: Warnings;
export let displayedLaws: number;
export let lawsArray: LawsArray;
export let title: HTMLTitleElement;
export let wheel: HTMLElement;
export let cursor: HTMLElement;
export let subwheel: HTMLElement;
export let cursorSlider: HTMLElement;
export let wheelMark: HTMLElement;
export let windowWidth: number;
export let windowHeight: number;
export let radius: number;
export let numberOfPlayers: number;
export let listeDesMinistres: ListeDesMinistres;

interface Messages {
    "tireTroisLois": string,
    "choisiDeuxLois": string,
    "elimination": string,
    "donneTonVote": string,
    "joueurElimine": string,
}

interface Warnings {
    "maxTwoLaws": string,
    "maxOneLaw": string,
    "notEnoughLaws":string,
    "tooSlow":string,
}

interface LawsArray {
    '0': string,
    '1': string,
}

interface ListeDesMinistres {
    "0": string,
    "1": string,
    "2": string,
    "3": string,
    "4": string,
    "5": string,
    "6": string,
    "7": string,
}