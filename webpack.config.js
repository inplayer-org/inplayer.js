var path = require('path');

module.exports = {
    entry: ['babel-polyfill', path.resolve(__dirname, 'src/index.js')],
    devtool: 'source-map',
    mode: 'production',
    output: {
        filename: 'inplayer.umd.js',
        // export to AMD, CommonJS, or window
        libraryTarget: 'umd',
        // the name exported to window
        library: 'InPlayer',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
        ],
    },
    optimization: {
        minimize: true,
    },
    stats: {
        colors: true,
    },
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        fs: 'empty',
    },
};
