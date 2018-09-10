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
    plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        })
    );
}

const baseFileName = `inplayer`;

const baseBundleConfig = {
    mode: PROD ? 'production' : 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
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
    loader: 'babel-loader',
    options: {},
};

// Browsers
const browserBundle = clone(baseBundleConfig);
browserBundle.module.rules = [
    Object.assign({}, defaultBabelLoader, {
        options: Object.assign({}, defaultBabelLoader.options, {
            forceEnv: 'browser',
        }),
    }),
];
browserBundle.output.filename = `${baseFileName}.umd${PROD ? '.min' : ''}.js`;

// Legacy browsers like IE11
const legacyBundle = clone(baseBundleConfig);
legacyBundle.module.rules = [
    Object.assign({}, defaultBabelLoader, {
        options: Object.assign({}, defaultBabelLoader.options, {
            forceEnv: 'legacy',
        }),
    }),
];
// To be replaced with babel-polyfill with babel-preset-env 2.0:
// https://github.com/babel/babel-preset-env#usebuiltins
// https://github.com/babel/babel-preset-env/pull/241
legacyBundle.entry = [
    'core-js/fn/promise',
    'core-js/fn/object/assign',
    'core-js/fn/array/from',
    'core-js/fn/array/find',
    'core-js/fn/set',
].concat(legacyBundle.entry);

legacyBundle.output.filename = `${baseFileName}.legacy${PROD ? '.min' : ''}.js`;

// Node
const nodeBundle = clone(baseBundleConfig);
nodeBundle.module.rules = [
    Object.assign({}, defaultBabelLoader, {
        options: Object.assign({}, defaultBabelLoader.options, {
            forceEnv: 'node',
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

module.exports = [browserBundle, legacyBundle, nodeBundle];
