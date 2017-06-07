/**
 * Created by azertypow on 09/04/2017.
 */

/**
 * Created by azertypow on 09/04/2017.
 */
var say = require('say');

// Use default system voice and speed
say.speak('Hello!');

// Stop the text currently being spoken
say.stop();

// More complex example (with an OS X voice) and slow speed
let speed = 0.92;

const base_speed = 175;
const speedToReturn = Math.ceil(base_speed * speed);

say.speak(`[[rate ${speedToReturn}]]bonjour Mathilde, tu es un poutcheur`, 'Thomas', 1);

// // Fire a callback once the text has completed being spoken
// say.speak('whats up, dog?', 'Amelie', 1.0, function(err) {
//     if (err) {
//         return console.error(err);
//     }
//
//     console.log('Text has been spoken.');
// });

// Export spoken audio to a WAV file
// say.export("coucou nous sommes tous la", 'Amelie', 0.75, 'hal.wav', function(err) {
//     if (err) {
//         return console.error(err);
//     }
//
//     console.log('Text has been saved to hal.wav.');
// });