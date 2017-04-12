/**
 * Created by azertypow on 12/04/2017.
 */

/// <reference types="mustache" />

    interface InitParam {
    setIndex: string;
    setStatus: string;
    setRules: string;
    indexElement: HTMLElement;
    statusElement: HTMLElement;
    rulesElement: HTMLElement;
}

    interface Player_info {
        index: string;
        status: string;
        rules: string
    }

    interface Player_elements {
        index: HTMLElement;
        status: HTMLElement;
        rules: HTMLElement;
    }

    interface Player_elementsTemplate {
        index: string;
        status: string;
        rules: string;
    }

export default class PlayerTemplate {

    player_info: Player_info;
    player_elements: Player_elements;
    player_elementsTemplate: Player_elementsTemplate;

    constructor(initParam: InitParam) {
        this.player_info = {
            index : initParam.setIndex,
            status : initParam.setStatus,
            rules : initParam.setRules
        };

        this.setElements(initParam.indexElement, initParam.statusElement, initParam.rulesElement);
        this.initTemplate();
        this.setValues(this.player_info);
    }

    public setElements(indexElement: HTMLElement, statusElement: HTMLElement, rulesElement: HTMLElement){
        this.player_elements = {
            index : indexElement,
            status : statusElement,
            rules : rulesElement
        }
    }

    public initTemplate () {
        this.player_elementsTemplate = {
            index: this.player_elements.index.innerHTML,
            status: this.player_elements.status.innerHTML,
            rules: this.player_elements.rules.innerHTML
        }
    }

    public setValues (patern: Object) {
        const renderIndex: string = Mustache.render(this.player_elementsTemplate.index, patern);
        const renderStatus: string = Mustache.render(this.player_elementsTemplate.status, patern);
        const renderRules: string = Mustache.render(this.player_elementsTemplate.rules, patern);


        this.player_elements.index.innerHTML = renderIndex;
        this.player_elements.status.innerHTML = renderStatus;
        this.player_elements.rules.innerHTML = renderRules;
    }
}
