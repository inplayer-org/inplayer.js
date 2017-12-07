import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';
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
  output: [{
    file: pkg.browser,
    format: 'umd',
  }, {
    file: 'examples/js/inplayer.js',
    format: 'umd',
  }
  ],
  plugins: [
    async(),
    replace({
     ENVIRONMENT: JSON.stringify('production')
    }),
    babel({
      exclude: [
        'node_modules/**',
      ]
    }),
    resolve({
      browser: true,
      jsnext: true,
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/js-cookie/src/js.cookie.js': ['get','set','remove'],
      }
    }),
    buble({
      exclude: '*.json',
      transforms: {
        generator: false
      }
    }),
    //uglify({}, minify),
    globals(),
    json()
  ],
  external: ['ws'],
  exports: 'named',
  context: 'self',
  acorn: {
    ecmaVersion: 8
  }
};
