import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [{
  name: 'InPlayer',
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  output: {
    file: 'examples/js/bundle.js',
    format: 'iife',
  },
  plugins: [
    babel({
      exclude: 'node_modules/*',
    }),
    serve('examples'),
    livereload(),
    resolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/js-cookie/src/js.cookie.js': ['get','set','remove'],
      }
    })
  ]
}];
