var tessel = require('tessel'); // import tesselsel = require('tessel'); // import tessel
var gpio = tessel.port['GPIO']; // select the GPIO port
var pin_input = gpio.pin['G3']; // readPulse only works on gpio.pin['G3']
// read a low pulse in (--_--) and timeout if there's no pulse within 3 seconds
pin_input.readPulse('low', 3000, function (err,pulse_len) {
  // if there's an err object it means the SCT timed out or was already in use
  if (err) {
    console.log(err.message);
    return;
  }
  // Log the pulse length
  console.log('Pulse read length:',pulse_len,'ms');
});
