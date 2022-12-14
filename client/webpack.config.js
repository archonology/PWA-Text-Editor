const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'MemText Editor App'
      }),

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      new WebpackPwaManifest({
        //this fingerprint removes the unique key upon deploy(index.html is able to grab the right file)
        fingerprints: false,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'PWA text editor',
        background_color: '#362F4B',
        theme_color: '#362F4B',
        color: '#F7F9FE',
        orientation: 'portrait',
        display: 'standalone',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: 'favicon.ico',
            filename: 'favicon.ico',
            size: [96],
            type: 'image/x-icon',
          },
          {
            src: path.resolve('src/images/logo.png'),
            size: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      })
    ],

    module: {
      // CSS loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};

