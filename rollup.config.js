import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import { join } from 'node:path';
import {
	existsSync,
	openSync,
	readFileSync,
	writeSync,
	closeSync,
} from 'node:fs';

const production = false; // !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

let materials = [
	'button',
	'card',
	'elevation',
	'icon-button',
	'ripple',
	'tab-bar',
	'tab-indicator',
	'tab-scroller',
	'tab',
	'theme',
	'tooltip',
	'top-app-bar',
	'typography',
	'list',
	'drawer',
	'switch',
	'theme',
	'circular-progress',
];

let smuiMaterials = [
	'paper',
	['accordion'],
]

let cssFiles = materials.map((name) => {
	return join(
		__dirname,
		'node_modules/@material',
		name,
		'dist',
		`mdc.${name}${production ? '.min' : ''}.css`);
}).concat(smuiMaterials.map((name) => {
	const isExtra = typeof name !== 'string';
	name = isExtra ? name[0] : name;
	return join(
		__dirname,
		'node_modules/@smui' + (isExtra ? '-extra' : ''),
		name,
		'bare.css'
	);
}));

if (!existsSync(join(__dirname, 'public/materials.css'))) {
	let outFile = openSync(join(__dirname, 'public/materials.css'), 'w');
	cssFiles.forEach(fileName => {
		let buffer = readFileSync(fileName);
		writeSync(outFile, buffer);
	});
	closeSync(outFile);
}

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({
			output: 'bundle.css'
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
