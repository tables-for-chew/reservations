var path = require('path');
var uglifyJsPlugin = require('uglifyjs-webpack-plugin');
var compressionPlugin = require('compression-webpack-plugin');
module.exports = {
  entry: path.resolve(__dirname, './client/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public')
  },
  optimization: {
    minimizer: [new uglifyJsPlugin()]
  },
  mode: 'development',
  devtool: 'inline-source-map',
  watchOptions: {
    poll: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules | bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [
    new compressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  externals: {
    'styled-components': true
  }
};
