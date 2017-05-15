/**
 * Created by azertypow on 12/05/2017.
 */

export default class LoadJs{
    static load(file: string): HTMLScriptElement{
        const jsElement: HTMLScriptElement = document.createElement("script");
        jsElement.type = "text/javascript";
        jsElement.src = file;
        document.body.appendChild(jsElement);
        return jsElement;
    }
}