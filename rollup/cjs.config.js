import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import async from 'rollup-plugin-async';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import globals from 'rollup-plugin-node-globals';
import { minify } from 'uglify-es';

const pkg = require('./package.json');

export default {
    input: 'src/index.js',
    output: {
        file: pkg['cjs:main'],
        format: 'cjs',
    },
    plugins: [
        builtins(),
        async(),
        replace({
            ENVIRONMENT: JSON.stringify('production'),
        }),
        babel({
            exclude: ['node_modules/**', '*.json'],
        }),
        resolve({
            browser: true,
            jsnext: true,
        }),
        commonjs({
            include: 'node_modules/**',
        }),
        uglify({}, minify),
        globals(),
        json(),
    ],
    external: ['ws', 'stompjs', 'es6-promise/auto'],
    exports: 'named',
    sourcemap: true,
    acorn: {
        ecmaVersion: 8,
    },
};
