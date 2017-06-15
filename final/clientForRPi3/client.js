var fetch = require('isomorphic-fetch');
var spawn = require( 'child_process' );

var spawn = require('child_process').spawn,
py    = spawn('python', ['compute_input.py']),
data = [1,2,3,4,5,6,7,8,9],
dataString = '';


  /*Here we are saying that every time our node application receives data from the python process output stream(on 'data'), we want to convert that received data into a string and append it to the overall dataString.*/
py.stdout.on('data', function(data){
  console.log('data: ',data);
  dataString += data.toString();
});

/*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
py.stdout.on('end', function(){
  console.log('Sum of numbers=',dataString);
});

// spawn.exec('python3 test.py', 
// 	function(err, stdout, stderr){
// 	var trade;
// 	var productName;
// 	if ( stdout == 1 )
// 		productName = 'coke';
// 	else if ( stdout == 2 )	
// 		productName = '7up';
// 	else if ( stdout == 3 )
// 		productName = 'apple juice';
// 	trade = {
// 	        productName,
// 	        tradeTime: String(new Date()),
// 	};
// 	fetch( 'http://52.179.13.42:3000/setTrade', {
// 	headers: {
// 	  Accept: 'application/json',
// 	  'Content-Type': 'application/json',
// 	},
// 	method: 'POST',
// 	body: JSON.stringify( trade ),
// 	credentials: 'same-origin',
// 	} );
// 	console.log('stdout: ' + stdout);
// });
