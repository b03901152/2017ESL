var tessel = require('tessel');
var servolib = require('servo-pca9685');

var servo = servolib.use(tessel.port['A']);

var servo1 = 1; // We have a servo plugged in at position1 1

servo.on('ready', function () {
  var position1 = 0;  //  Target position1 of the servo between 0 (min) and 1 (max).
  servo.configure(servo1, 0.05, 0.12, function () {
    setInterval(function () {
      console.log('Position (in range 0-1):', position1);
      servo.move(servo1, position1);
      if (position1 > 1) {
        position1 = 0; // Reset servo position1
      }
    }, 500); // Every 500 milliseconds
  });

  
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
