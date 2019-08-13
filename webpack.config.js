const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const PROD = process.env.NODE_ENV === 'production';
const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new CopyWebpackPlugin([{ from: './src/index.d.ts', to: './index.d.ts' }]),
];

if (PROD) {
    plugins.push(new MinifyPlugin());
}

module.exports = {
    mode: PROD ? 'production' : 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        libraryTarget: 'umd',
        filename: 'inplayer.umd.js',
        library: 'InPlayer', // the name exported to window
        libraryExport: 'default',
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.(t|j)s$/,
                loader: 'ts-loader',
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /(\.(j|t)sx|\.(j|t)s)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
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
