const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const clone = require('lodash/cloneDeep');
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

const baseFileName = 'inplayer';

const baseBundleConfig = {
    mode: PROD ? 'production' : 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        libraryTarget: 'umd',
        library: 'inplayer',
    },

    module: {
        rules: [],
    },
    devtool: PROD ? false : 'source-map',
    plugins,
    node: {
        os: 'empty',
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        fs: 'empty',
    },
};

const defaultBabelLoader = {
    test: /\.js?$/,
    include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'test')],
    exclude: /(node_modules|bower_components)/,
    loader: 'babel-loader',
    options: {},
};

// Browsers
const browserBundle = clone(baseBundleConfig);

browserBundle.module.rules = [
    Object.assign({}, defaultBabelLoader, {
        options: Object.assign({}, defaultBabelLoader.options, {
            envName: 'browser',
        }),
    }),
];
browserBundle.output.filename = `${baseFileName}.umd${PROD ? '.min' : ''}.js`;

// Node
const nodeBundle = clone(baseBundleConfig);

nodeBundle.module.rules = [
    Object.assign({}, defaultBabelLoader, {
        options: Object.assign({}, defaultBabelLoader.options, {
            envName: 'node',
        }),
    }),
];

nodeBundle.target = 'node';
nodeBundle.output.libraryTarget = 'commonjs2';
nodeBundle.output.filename = `${baseFileName}.node${PROD ? '.min' : ''}.js`;
nodeBundle.plugins.push(
    new webpack.NormalModuleReplacementPlugin(/^mqtt$/, 'mqtt/dist/mqtt.js')
);
delete nodeBundle.node;

module.exports = [browserBundle, nodeBundle];
