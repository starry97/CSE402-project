const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/dist/",
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/, 
      exclude: /node_modules/, 
      include: [
        path.resolve(__dirname, "src")
      ],
      use: [{
        loader: "babel-loader"
      }]
    }]
  }
};