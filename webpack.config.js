const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const PROD = process.env.NODE_ENV === 'production';
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new CopyWebpackPlugin([{ from: './src/index.d.ts', to: './index.d.ts' }]),
  new LodashModuleReplacementPlugin({
    caching: true,
    cloning: true,
    memoizing: true,
  }),
];

module.exports = {
  mode: PROD ? 'production' : 'development',
  devtool: PROD ? false : 'source-map',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  entry: './src/inplayer.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'umd',
    filename: 'inplayer.min.js',
    library: 'InPlayer', // the name exported to window
    libraryExport: 'default',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /(\.(j|t)sx|\.(j|t)s)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          emitWarning: process.env.NODE_ENV !== 'production',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    fs: 'empty',
  },
  plugins,
};
