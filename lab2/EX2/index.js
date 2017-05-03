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
var servo3 = 3; // We have a servo plugged in at position 1
var servo4 = 4; // We have a servo plugged in at position 1
var position1 = 1;
var position2 = 1;
var position3 = 0.5;
var position4 = 0.5;
setInterval( () => {
  console.log( position1, position2, position3, position4 );
}, 500 );
servo.on('ready', function () {
  servo.configure(servo1, 0.05, 0.12, function () {
    setInterval( () => {
      servo.move(servo1, position1);
      servo.move(servo2, position2);
      servo.move(servo3, 1-position3);
      servo.move(servo4, position4);

      if (position1 > 1)
        position1 = 1;
      else if( position1 < 0 )
        position1 = 0;

      if (position2 > 1)
        position2 = 1;
      else if( position2 < 0 )
        position2 = 0;

    }, 1); // Every 500 milliseconds
  });
  // servo.configure(servo2, 0.05, 1, function () {
  //   setInterval( () => {
  //     // servo.move(servo1, position1);
  //     servo.move(servo2, position2);

  //     // if (position1 > 1)
  //       // position1 = 0;
  //     if (position2 > 1 || position2 < 0 )
  //       position2 = 0.5;
  //     console.log("position2:" , position2 );

  //   }, 500); // Every 500 milliseconds
  // });

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
            position2 -= 0.05;
            break;
        case 's': // down rotate
            position2 += 0.05;
            break;
        case 'a': // left rotate
            position1 += 0.05;
            break;
        case 'd': // right
            position1 -= 0.05;
            break;
        case 'i': // right
            position3 = 1;
            position4 = 1;
            break;
        case 'k': // right
            position3 = 0;
            position4 = 0;
            break;
        case 'j': // right
            position4 -= 0.05;
            break;
        case 'l': // right
            position4 += 0.05;
            break;
        

  }
  process.stdout.write('Get Chunk: ' + chunk + '\n');
});
