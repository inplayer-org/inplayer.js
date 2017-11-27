import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

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
  ]
}];
