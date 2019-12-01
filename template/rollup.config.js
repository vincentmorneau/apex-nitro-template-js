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
      file: `${config.distFolder}/${config.libraryName}${process.env.BUILD === 'production' ? '.min' : ''}.js`,
      format: 'iife',
      sourcemap: process.env.BUILD === 'production' ? false : true,
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
        plugins: process.env.BUILD === 'production' ? [autoprefixer(), cssnano()] : [autoprefixer()],
        extract: `${config.distFolder}/${config.libraryName}${process.env.BUILD === 'production' ? '.min' : ''}.css`,
        sourceMap: process.env.BUILD === 'production' ? false : true
      }),
      resolve({
        mainFields: ['main']
      }),
      commonjs(),
      eslint(),
      babel({
        babelrc: true
      }),
      process.env.BUILD === 'production' ? terser() : null,
      copy({
        targets: [
          { src: `${config.srcFolder}/static`, dest: `${config.distFolder}` }
        ]
      })
    ]
  }
];
