import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import config from './apexnitro.config.json';

export default [
    {
        input: config.pro.main,
        output: {
            name: config.pro.libraryCode,
            file: `${config.distFolder}/${config.pro.libraryName}${
                process.env.BUILD === 'production' ? '.min' : ''
            }.js`,
            format: 'iife',
            sourcemap: process.env.BUILD === 'production' ? false : 'inline',
            globals: config.pro.globals,
        },
        external: config.pro.external,
        plugins: [
            replace({
                include: config.pro.main,
                values: {
                    NPM_PACKAGE_PROJECT_NAME: config.pro.libraryName,
                    NPM_PACKAGE_PROJECT_VERSION: config.pro.version,
                },
            }),
            postcss({
                extensions: config.pro.cssExtensions,
                plugins: process.env.BUILD === 'production' ? [autoprefixer(), cssnano()] : [],
                extract: `${config.distFolder}/${config.pro.libraryName}${
                    process.env.BUILD === 'production' ? '.min' : ''
                }.css`,
            }),
            resolve({
                mainFields: ['main'],
            }),
            commonjs(),
            eslint({ exclude: ['node_modules/**', 'src/styles/**'] }),
            babel({
                babelrc: true,
            }),
            process.env.BUILD === 'production' ? terser() : null,
        ],
    },
];
