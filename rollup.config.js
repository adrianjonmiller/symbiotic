import terser from '@rollup/plugin-terser';

const banner = `/*!
 * Symbiote - A lightweight DOM attachment framework
 * @version 1.0.0
 * @license MIT
 */`;

export default [
  // ES Module build
  {
    input: 'src/main.js',
    output: {
      file: 'dist/symbiote.esm.js',
      format: 'es',
      banner
    }
  },
  
  // ES Module build (minified)
  {
    input: 'src/main.js',
    output: {
      file: 'dist/symbiote.esm.min.js',
      format: 'es',
      banner
    },
    plugins: [terser()]
  },
  
  // UMD build
  {
    input: 'src/main.js',
    output: {
      file: 'dist/symbiote.umd.js',
      format: 'umd',
      name: 'Symbiote',
      exports: 'named',
      banner
    }
  },
  
  // UMD build (minified)
  {
    input: 'src/main.js',
    output: {
      file: 'dist/symbiote.umd.min.js',
      format: 'umd',
      name: 'Symbiote',
      exports: 'named',
      banner
    },
    plugins: [terser()]
  },
  
  // IIFE build (for direct script tag usage)
  {
    input: 'src/main.js',
    output: {
      file: 'dist/symbiote.iife.js',
      format: 'iife',
      name: 'Symbiote',
      exports: 'named',
      banner
    }
  },
  
  // IIFE build (minified)
  {
    input: 'src/main.js',
    output: {
      file: 'dist/symbiote.iife.min.js',
      format: 'iife',
      name: 'Symbiote',
      exports: 'named',
      banner
    },
    plugins: [terser()]
  }
];
