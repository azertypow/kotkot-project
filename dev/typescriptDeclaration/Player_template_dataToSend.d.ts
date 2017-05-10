/**
 * Created by azertypow on 10/05/2017.
 */

interface Player_template_dataToSend {
    index: string,
    status: string,
    rules: string,
    buttons: Array<string>,
}



interface InitParam {
    setIndex: string,
    setStatus: string,
    setRules: string,
    setButtons: Array<string>,
    indexElement: HTMLElement,
    statusElement: HTMLElement,
    rulesElement: HTMLElement,
    buttonsElement: HTMLElement,
}

interface Player_info {
    index: string,
    status: string,
    rules: string,
    buttons: Array<string>,
}

interface Player_elements {
    index: HTMLElement,
    status: HTMLElement,
    rules: HTMLElement,
    buttons: HTMLElement,
}

interface Player_elementsTemplate {
    index: string,
    status: string,
    rules: string,
    buttons: string,
}