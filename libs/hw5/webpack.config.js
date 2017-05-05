const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
  loaders: [{
    test: /\.js$/,
    loaders: ['babel'],
    exclude: /node_modules/,
	},
	{
    test: /\.css$/,  // target: css files
    loaders: ['style', 'css'], // use both loaders
    exclude: /node_modules/,   // 不要處理 3rd party 的 code
    }],
  },
};
// }
// module.exports = {
//   ...
  
// };