const path = require('path');

var config = {
   entry: './src/main.js',
	// context:path.join(__dirname,"src"),
   output: {
    path: path.resolve(__dirname, "src"),
    filename: 'bundle.js',
   },
	
   devServer: {
      inline: true,
      port: 3030
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react','stage-0']
            }
         }
      ]
   }
}

module.exports = config;