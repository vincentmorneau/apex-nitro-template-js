import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import apexnitroConfig from './apexnitro.config.json';

apexnitroConfig.globals = apexnitroConfig.external.reduce((a, b) => ((a[b] = b), a), {});

export default [
	{
		input: apexnitroConfig.main,
		output: {
			name: apexnitroConfig.libraryName,
			file: `${apexnitroConfig.distFolder}/${apexnitroConfig.libraryName}.js`,
			format: 'iife',
			sourcemap: true,
			globals: apexnitroConfig.globals
		},
		external: apexnitroConfig.external,
		plugins: [
			postcss({
				extensions: apexnitroConfig.cssExtensions,
				plugins: [autoprefixer()],
				extract: `${apexnitroConfig.distFolder}/${apexnitroConfig.libraryName}.css`,
				sourceMap: true
			}),
			resolve(),
			commonjs(),
			eslint(),
			babel()
		]
	},
	{
		input: apexnitroConfig.main,
		output: {
			name: apexnitroConfig.libraryName,
			file: `${apexnitroConfig.distFolder}/${apexnitroConfig.libraryName}.min.js`,
			format: 'iife',
			sourcemap: false,
			globals: apexnitroConfig.globals
		},
		external: apexnitroConfig.external,
		plugins: [
			postcss({
				extensions: apexnitroConfig.cssExtensions,
				plugins: [autoprefixer(), cssnano()],
				extract: `${apexnitroConfig.distFolder}/${apexnitroConfig.libraryName}.min.css`,
				sourceMap: false
			}),
			resolve(),
			commonjs(),
			babel(),
			terser(),
			copy({
				targets: [{ src: `${apexnitroConfig.srcFolder}/static`, dest: `${apexnitroConfig.distFolder}` }]
			})
		]
	}
];
