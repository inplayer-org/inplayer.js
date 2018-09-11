const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const PROD = process.env.NODE_ENV === 'production';

const plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
];

if (PROD) {
    plugins.push(new MinifyPlugin());
}

module.exports = {
    mode: PROD ? 'production' : 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        libraryTarget: 'umd',
        filename: 'inplayer.umd.js',
        // the name exported to window
        library: 'InPlayer',
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
            },
        ],
    },
    optimization: {
        minimize: true,
    },
    devtool: PROD ? false : 'source-map',
    plugins,
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        fs: 'empty',
    },
};
