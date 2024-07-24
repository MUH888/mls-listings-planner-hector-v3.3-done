const path = require('path');

module.exports = {
  mode: 'development', // Set the mode to 'development' or 'production' as needed
  entry: './js/app.js', // Adjusted entry point to match your existing structure
  output: {
    filename: 'bundle.js', // Output file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
