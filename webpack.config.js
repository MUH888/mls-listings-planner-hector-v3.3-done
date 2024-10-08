const path = require('path');

module.exports = {
  mode: 'production', // Set the mode to 'production'
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
  devtool: false, // Disable devtool for production
};
