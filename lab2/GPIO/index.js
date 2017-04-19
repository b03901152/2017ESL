var tessel = require('tessel'); // Import tessel
var pinA0 = tessel.port.B.pin[0]; // Select pin 2 on port A
var time = 500;
setInterval(()=>pinA0.read( (error, value) => console.log('A0',value) ),time);

var pinA1 = tessel.port.B.pin[1]; // Select pin 2 on port A
setInterval(
	()=>pinA1.analogRead( (error, value) => console.log('A1',value) )
,time);
var pinA2 = tessel.port.B.pin[2]; // Select pin 2 on port A
setInterval(()=>pinA2.analogRead( (error, value) => console.log('A2',value) ),time);


setInterval(()=>console.log("ss"),time);

// analogRead
// pin.read(function(error, value) {
//   // Print the pin value to the console
// 	  console.log(value);
// });