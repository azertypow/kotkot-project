const say = require("say");
const mkdirp = require("mkdirp");
const jsonAudioRef = require("../../data/voice.json");
let path = "";
let createFile = false;
let numberOfAudioFiles = 0;
function readJsonLevel(jsonLevel, currentNameKey) {
    console.log("––––––––––");
    const jsonKeys = Object.keys(jsonLevel);
    if (typeof jsonLevel === "string") {
        console.log(`${currentNameKey} est un fichier audio a generer généré dans path`);
        console.log(jsonLevel);
        mkdirp(currentNameKey, function (err) {
            if (err)
                console.error(err);
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
        console.log("contenu du sous-dossier a venir:");
        for (let i = 0; i < jsonKeys.length; i++) {
            console.log(`\t${jsonKeys[i]}`);
        }
        console.log("parcourir le sous-dossier");
        for (let i = 0; i < jsonKeys.length; i++) {
            readJsonLevel(jsonLevel[jsonKeys[i]], currentNameKey + jsonKeys[i]);
        }
    }
    console.log("––––––––––");
}
readJsonLevel(jsonAudioRef, "./prod/browser/audiofiles");
console.log(Object.keys(jsonAudioRef).length);
function exportToWav(message, path) {
    say.export(message, 'Audrey', 1, `${path}.wav`, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('Text has been saved to hal.wav.');
    });
}
