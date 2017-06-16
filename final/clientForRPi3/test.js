var sys   = require('sys'),
    spawn = require('child_process').spawn,
    dummy2  = spawn('python3', ['test.py']);

dummy2.stdout.on('data', function(data) {
	console.log('data',data);
    sys.print(data.toString());
});