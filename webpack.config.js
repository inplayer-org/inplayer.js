let path = require('path');
const UglifyPlugin = require('uglifyjs-webpack-plugin');

// TODO: add webpack-bundler-analyzer to dev config
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//     .BundleAnalyzerPlugin;

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    devtool: 'source-map',
    mode: 'production',
    output: {
        filename: 'inplayer.umd.js',
        // export to AMD, CommonJS, or window
        libraryTarget: 'umd',
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
        minimizer: [
            new UglifyPlugin({
                uglifyOptions: {
                    compress: true,
                    mangle: true,
                    output: {
                        comments: false,
                    },
                },
                sourceMap: false,
            }),
        ],
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
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./src')],
        extensions: ['.json', '.js'],
    },
    plugins: [],
};
