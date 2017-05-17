/**
 * Created by mathi on 16/05/2017.
 */

var myElement = document.getElementById('molette');

var hammertime = new Hammer(myElement);

function myOptions() {
    // rotate est désactivé par défaut pour éviter de bloquer les autres gestes

}
hammertime.get('rotate').set({ enable: true });

hammertime.on('rotate', function(ev) {
    console.log(ev);

    var myAngle = ev.angle;
    console.log(myAngle);

    document.getElementById("molette").style.transform = "rotate(" + myAngle + "deg)";


});





// document.getElementById('molette').addEventListener('touch', function() {console.log('hello j"ai touché');});
