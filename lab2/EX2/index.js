// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This servo module demo turns the servo around
1/10 of its full rotation  every 500ms, then
resets it after 10 turns, reading out position
to the console at each movement.
*********************************************/

var tessel = require('tessel');
var servolib = require('servo-pca9685');

var servo = servolib.use(tessel.port['A']);

var servo1 = 1; // We have a servo plugged in at position 1
var servo2 = 2; // We have a servo plugged in at position 1
var position1 = 1;
var position2 = 1;
servo.on('ready', function () {
  servo.configure(servo1, 0.05, 1, function () {
    setInterval( () => {
      servo.move(servo1, position1);
      // servo.move(servo2, position2);
      if (position1 > 1)
        position1 = 0;
      console.log( "position1: ", position1 );
      // if (position2 > 1)
        // position2 = 0;
    }, 500); // Every 500 milliseconds
  });
// servo.configure(servo2, 0.05, 1, function () {
//     setInterval( () => {
//       servo.move(servo1, position1);
//       // servo.move(servo2, position2);
//       // if (position1 > 1)
//         // position1 = 0;
//       console.log( "position2: ", position2 );
//       if (position2 > 1)
//         position2 = 0;
//     }, 500); // Every 500 milliseconds
//   });


});


var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



var stdin = process.openStdin(); 
require('tty').setRawMode(true);    

stdin.on('keypress', function (chunk, key) {
  switch( chunk ) {
        case 'w': // up rotate
            position2 += 0.1;
            break;
        case 's': // down rotate
            position2 -= 0.1;
            break;
        case 'a': // left rotate
            position1 -= 0.1;
            break;
        case 'd': // right
            position1 -= 0.1;
            break;
  }
  process.stdout.write('Get Chunk: ' + chunk + '\n');
});
