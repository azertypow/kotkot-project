/**
 * Created by azertypow on 06/06/2017.
 */

const say: any = require("say");
const mkdirp = require("mkdirp");

const jsonAudioRef: any = require("../../data/voice.json");

let path: string = "";
let createFile: boolean = false;
let numberOfAudioFiles = 0;

function readJsonLevel(jsonLevel: any, currentNameKey: string){
    console.log("––––––––––");
    const jsonKeys: Array<string> = Object.keys(jsonLevel);

    if(typeof jsonLevel === "string"){
        console.log(`${currentNameKey} est un fichier audio a generer généré dans path`);
        console.log(jsonLevel);

        mkdirp(currentNameKey, function (err: Error) {
            if (err) console.error(err);
            else {
                console.log("dossier créé");
                exportToWav(jsonLevel, currentNameKey);
            }
        });
    }
    else {
        currentNameKey += "/";

        console.log(jsonKeys);

        console.log(`${currentNameKey} est un dossier avec ${jsonKeys.length} sous-dossier:`);

        // afficher le contenu du sous-dossier a venir
        console.log("contenu du sous-dossier a venir:");
        for(let i: number = 0; i < jsonKeys.length; i++){
            console.log(`\t${jsonKeys[i]}`);
        }

        console.log("parcourir le sous-dossier");
        for(let i: number = 0; i < jsonKeys.length; i++){
            readJsonLevel(jsonLevel[jsonKeys[i]], currentNameKey+jsonKeys[i]);
        }
    }

    console.log("––––––––––");
}

readJsonLevel(jsonAudioRef, "./prod/browser/audiofiles");

console.log(Object.keys(jsonAudioRef).length);



// Export spoken audio to a WAV file
function exportToWav(message: string, path: string){
    say.export(message, 'Audrey', 1, `${path}.wav`, function(err: Error) {

        if (err) {
            return console.error(err);
        }

        console.log('Text has been saved to hal.wav.');
    });
}