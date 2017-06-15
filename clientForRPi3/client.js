var fetch = require('isomorphic-fetch');
var spawn = require( 'child_process' );


spawn.exec('python3 test.py', 
	function(err, stdout, stderr){
	var trade;
	var productName;
	if ( stdout == 1 )
		productName = 'coke';
	else if ( stdout == 2 )	
		productName = '7up';
	else if ( stdout == 3 )
		productName = 'apple juice';
	trade = {
	        productName,
	        tradeTime: String(new Date()),
	};
	fetch( 'http://52.179.13.42:3000/setTrade', {
	headers: {
	  Accept: 'application/json',
	  'Content-Type': 'application/json',
	},
	method: 'POST',
	body: JSON.stringify( trade ),
	credentials: 'same-origin',
	} );
	console.log('stdout: ' + stdout);
});
