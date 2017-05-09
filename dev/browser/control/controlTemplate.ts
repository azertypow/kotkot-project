/**
 * Created by azertypow on 09/05/2017.
 */

/// <reference types="mustache" />
/// <reference path="../../typescriptDeclaration/controlTemplateMustachFormat.d.ts"/>
/// <reference path="../../typescriptDeclaration/controlTemplateMustachFormatPlayers.d.ts"/>

export default class ControlTemplate {
    playerTemplate: string;
    element: HTMLElement;

    constructor (element: HTMLElement) {
        this.playerTemplate = element.innerHTML;
        this.element = element;
    }

    render(data: ControlTemplateMustachFormatPlayers){
        const renderStatus: string = Mustache.render(this.playerTemplate, data);

        this.element.innerHTML = renderStatus;

        console.log(renderStatus);
    }
}