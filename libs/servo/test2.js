var repl = require('repl');
var connections = 0;
process.stdin.pipe(remoteProcess.stdin);
repl.start({
  prompt: 'Node.js via stdin> ',
  input: process.stdin,
  output: process.stdout
});