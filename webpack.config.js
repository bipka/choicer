const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    sw: './src/sw.js'
  },
  mode: 'development',

  output: {
    filename: '[name].js',              // main.js и sw.js
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',                    // важно для корректных путей в PWA
    clean: true
  },

  resolve: {
    alias: {
      react: path.resolve(__dirname, '../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom')
    }
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),

    // Копируем manifest + icons + splash в dist
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/pwa/favicon.ico'), to: 'favicon.ico' },
        { from: path.resolve(__dirname, 'src/pwa/manifest.webmanifest'), to: 'manifest.webmanifest' },
        { from: path.resolve(__dirname, 'src/pwa/icons'), to: 'icons' },
        { from: path.resolve(__dirname, 'src/pwa/splash'), to: 'splash' }
      ]
    })
  ]
};