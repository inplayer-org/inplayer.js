import babel from 'rollup-plugin-babel';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import async from 'rollup-plugin-async';
import { minify } from 'uglify-es';

const pkg = require('./package.json');

export default {
  input: 'src/index.js',
  output: {
    file: pkg['cjs:main'],
    format: "cjs",
  },
  plugins: [
    async(),
    babel({
      exclude: 'node_modules/**',
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
      exclude: 'package.json',
      transforms: {
        generator: false
      }
    }),
    uglify({}, minify),
  ],
  external: [
    'js-cookie'
  ],
  exports: 'named',
  sourcemap: true,
  acorn: {
    ecmaVersion: 8
  }
};
