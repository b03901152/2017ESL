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

      if (position1 > 1)
        position1 = 0;

    }, 500); // Every 500 milliseconds
  });
  servo.configure(servo2, 0.05, 1, function () {
    setInterval( () => {
      servo.move(servo2, position2);

      if (position2 > 1)
        position2 = 0;

    }, 500); // Every 500 milliseconds
  });
});


var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.on('line', function(key){
  //position = key;
  // console.log("position",position);
    switch(key.trim()) {
        case 'w': // up rotate
            position2 += 0.1;
            break;
        case 's': // down rotate
            position2 -= 0.1;

            // rl.write("Write");
            // console.log('world!');
            break;
        case 'a': // left rotate
            position1 -= 0.1;
            break;
        case 'd': // right
            position1 += 0.1;
            break;
        // case 'a':
        //     rl.close();
        //     break;
        // case 'a':
        //     rl.close();
        //     break;
        // case 'a':
        //     rl.close();
        //     break;
        // case 'a':
        //     rl.close();
        //     break;
        // case 'a':
        //     rl.close();
        //     break;
        default:
            console.log('没有找到命令！');
            break;
    }
});
rl.on('close', function() {
    console.log('bye bye');
    process.exit(0);
});
