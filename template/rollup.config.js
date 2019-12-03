import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import replace from 'rollup-plugin-replace';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import config from './apexnitro.config.json';

export default [
  {
    input: config.main,
    output: {
      name: config.libraryName,
      file: `${config.distFolder}/${config.libraryName}.js`,
      format: 'iife',
      sourcemap: true,
      globals: config.globals
    },
    external: config.external,
    plugins: [
      replace({
        include: config.main,
        values: {
          NPM_PACKAGE_PROJECT_NAME: config.libraryName,
          NPM_PACKAGE_PROJECT_VERSION: config.version
        }
      }),
      postcss({
        extensions: config.cssExtensions,
        plugins: [autoprefixer()],
        extract: `${config.distFolder}/${config.libraryName}.css`,
        sourceMap: true
      }),
      resolve({
        mainFields: ['main']
      }),
      commonjs(),
      eslint(),
      babel({
        babelrc: true
      })
    ]
  },
  {
    input: config.main,
    output: {
      name: config.libraryName,
      file: `${config.distFolder}/${config.libraryName}.min.js`,
      format: 'iife',
      sourcemap: false,
      globals: config.globals
    },
    external: config.external,
    plugins: [
      replace({
        include: config.main,
        values: {
          NPM_PACKAGE_PROJECT_NAME: config.libraryName,
          NPM_PACKAGE_PROJECT_VERSION: config.version
        }
      }),
      postcss({
        extensions: config.cssExtensions,
        plugins: [autoprefixer(), cssnano()],
        extract: `${config.distFolder}/${config.libraryName}.min.css`,
        sourceMap: false
      }),
      resolve({
        mainFields: ['main']
      }),
      commonjs(),
      babel({
        babelrc: true
      }),
      terser(),
      copy({
        targets: [
          { src: `${config.srcFolder}/static`, dest: `${config.distFolder}` }
        ]
      })
    ]
  }
];
