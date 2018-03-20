import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';
import async from 'rollup-plugin-async';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import globals from 'rollup-plugin-node-globals';
import { minify } from 'uglify-es';

const pkg = require('./package.json');

export default {
    name: 'InPlayer',
    input: 'src/index.js',
    output: [
        {
            file: pkg.browser,
            format: 'umd',
        },
        {
            file: 'examples/js/inplayer.js',
            format: 'umd',
        },
    ],
    plugins: [
        builtins(),
        async(),
        replace({
            ENVIRONMENT: JSON.stringify('production'),
        }),
        babel({
            exclude: ['node_modules/**'],
            babelrc: false,
        }),
        resolve({
            browser: true,
            jsnext: true,
        }),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                'node_modules/stompjs/lib/stomp-node.js': ['net', 'websocket'],
            },
        }),
        uglify({}, minify),
        globals(),
        json(),
    ],
    globals: {
        net: 'net',
        websocket: 'websocket',
    },
    external: ['net', 'websocket', 'es6-promise/auto'],
    exports: 'named',
    context: 'self',
    acorn: {
        ecmaVersion: 8,
    },
};
