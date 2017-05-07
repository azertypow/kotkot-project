/**
 * Created by azertypow on 07/05/2017.
 */

export default class LocationInfo {

    public parse: HTMLAnchorElement;

    constructor(urlToParse: string) {
        this.parse = document.createElement("a");
        this.parse.href = urlToParse;
    }
}
