/**
 * Created by mathi on 03/06/2017.
 */


// fichier avec les voix
function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200 || httpRequest.status === 0) {
                var voice = JSON.parse(httpRequest.responseText);
                if (callback) callback(voice);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

// this requests the file and executes a callback with the parsed result once
//   it is available
fetchJSONFile('../../../data/voice.json', function(voice){
    // do something with your data
    // console.log(voice);
});


var text;

// fichier avec les textes pour les interfaces
function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200 || httpRequest.status === 0) {
                text = JSON.parse(httpRequest.responseText);
                if (callback) callback(text);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

// this requests the file and executes a callback with the parsed result once
//   it is available
// fetchJSONFile('../../../data/text.json', function(text){
//     // do something with your data
//     console.log(text);
// });
