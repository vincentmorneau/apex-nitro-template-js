const apexnitroConfig = require('./apexnitro.config.json');

const eslintConfig = {
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 10,
		sourceType: 'module'
	},
	env: {
		browser: true,
		es6: true,
		node: true
	}
};

eslintConfig.globals = apexnitroConfig.external.reduce((a, b) => ((a[b] = 'readonly'), a), {});

module.exports = eslintConfig;