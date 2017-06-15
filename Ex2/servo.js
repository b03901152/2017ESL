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
var position1 = 0.5;
var position2 = 0.5;
var position3 = 0.5;
var position4 = 0.5;
setInterval( () => {
  console.log( position1, position2, position3, position4 );
}, 500 );
servo.on('ready', function () {
  servo.configure(servo1, 0.05, 0.12, function () {
    setInterval( () => {
      servo.move(servo1, position1);

      if (position1 > 1)
        position1 = 1;
      else if( position1 < 0 )
        position1 = 0;

    }, 10); // Every 500 milliseconds
  });
  servo.configure(servo2, 0.05, 0.12, function () {
    setInterval( () => {
      servo.move(servo2, position2);

      if (position2 > 1)
        position2 = 1;
      else if( position2 < 0 )
        position2 = 0;

    }, 10); // Every 500 milliseconds
  });
  servo.configure(servo3, 0.05, 0.12, function () {
    setInterval( () => {
      servo.move(servo3, 1 - position3);

    }, 10);
  });
  servo.configure(servo4, 0.05, 0.12, function () {
    setInterval( () => {
      servo.move(servo4, position4);

    }, 10);
  });

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
        case 'i': // front
            position3 = 1;
            position4 = 1;
            break;
        case 'k': // back
            position3 = 0;
            position4 = 0;
            break;
        case 'j': // left
            position3 = 1;
            position4 = 0;
            break;
        case 'l': // right
            position3 = 0;
            position4 = 1;
            break;
        case ' ':
            position3 = 0.5;
            position4 = 0.5;

  }
  process.stdout.write('Get Chunk: ' + chunk + '\n');
});


const av = require("tessel-av");
const ip = require("ip");
const os = require("os");
const http = require("http");
const port = 8888;

const camera = new av.Camera({
  fps: 3000,
  // width: 1280,
  // height: 720,
  width: 800,
  height: 600,
});

const server = http.createServer((request, response) => {

  if (/frame/.test(request.url)) {
    console.log("asking for image...");

    response.writeHead(200, { "Content-Type": "image/jpeg" });
    camera.capture().pipe(response);
  } else {
    console.log("asking for web page...");
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(`
      <!doctype html>
      <html>
        <head>
          <title>${os.hostname()}</title>
        </head>
        <body>
          <img src="/frame">
        </body>
      </html>
    `);
  }
}).listen(port, () => {
  console.log(`http://${ip.address()}:${port}`);
  console.log(`<img src="${camera.url}">`);
});
