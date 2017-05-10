/**
 * Created by azertypow on 12/04/2017.
 */

/// <reference types="mustache" />
/// <reference path="../../typescriptDeclaration/Player_template_dataToSend.d.ts" />

export default class PlayerTemplate {

    player_info: Player_info;
    player_elements: Player_elements;
    player_elementsTemplate: Player_elementsTemplate;

    constructor(initParam: InitParam) {
        this.player_info = {
            index : initParam.setIndex,
            status : initParam.setStatus,
            rules : initParam.setRules,
            buttons: initParam.setButtons,
        };

        this.setElements(initParam.indexElement, initParam.statusElement, initParam.rulesElement, initParam.buttonsElement);
        this.initTemplate();
        this.setValues(this.player_info);
    }

    public setElements(indexElement: HTMLElement, statusElement: HTMLElement, rulesElement: HTMLElement, buttonsElement: HTMLElement){
        this.player_elements = {
            index : indexElement,
            status : statusElement,
            rules : rulesElement,
            buttons: buttonsElement,
        }
    }

    public initTemplate () {
        this.player_elementsTemplate = {
            index: this.player_elements.index.innerHTML,
            status: this.player_elements.status.innerHTML,
            rules: this.player_elements.rules.innerHTML,
            buttons: this.player_elements.buttons.innerHTML,
        }
    }

    public setValues (patern: Player_template_dataToSend) {

        console.log(patern);

        const renderIndex: string = Mustache.render(this.player_elementsTemplate.index, patern);
        const renderStatus: string = Mustache.render(this.player_elementsTemplate.status, patern);
        const renderRules: string = Mustache.render(this.player_elementsTemplate.rules, patern);
        const renderButtons: string = Mustache.render(this.player_elementsTemplate.buttons, patern);


        this.player_elements.index.innerHTML = renderIndex;
        this.player_elements.status.innerHTML = renderStatus;
        this.player_elements.rules.innerHTML = renderRules;
        this.player_elements.buttons.innerHTML = renderButtons;
    }
}
