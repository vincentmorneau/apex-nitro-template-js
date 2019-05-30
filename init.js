const semverRegex = require('semver-regex');
const inquirer = require('inquirer');

/**
 * @exports init
 */
module.exports = init;

/**
 * @function init
 * @param appDetails
 * @param {string} appDetails.appName
 * @param {string} appDetails.appPath
 * @param {boolean} appDetails.suppressInquiry
 * @returns {PromiseLike}
 * @description Entry point for creating a new app with the template
 */
function init(appDetails) {
	const config = {
		libraryName: 'undefined',
		libraryCode: 'undefined',
		main: './src/main.js',
		globals: {
			apex: 'apex'
		},
		external: ['apex'],
		cssExtensions: ['.css', '.less'],
		targets: 'last 2 versions, >0.25%, not dead',
		version: 'undefined'
	};
	if (appDetails.suppressInquiry) {
		return Promise.resolve(config);
	}
	return inquirer.prompt(getQuestions(appDetails)).then(answers => {
		return new Promise((resolve, reject) => {
			try {
				config.libraryName = answers['library-name'];
				config.libraryCode = answers['library-code'];
				config.version = answers['version'];

				// set default browsersync settings:
				config.browsersync = {};
				config.browsersync.realTime = true;
				config.browsersync.ghostMode = false;
				config.browsersync.notify = true;
				config.apex = {};
				config.apex.openBuilder = false;

				// set default publish settings:
				config.publish = {};
				config.publish.destination = 'application';
				config.publish.path = 'sqlcl';
				config.publish.username = '';
				config.publish.password = '';
				config.publish.connectionString = '';

				resolve(config);
			} catch (err) {
				reject(err);
			}
		});
	});
}

const isRequired = function(input) {
	if (input !== '') {
		return true;
	}

	return 'Required.';
};

/**
 * @private
 */
function getQuestions(appDetails) {
	return [
		{
			type: 'input',
			name: 'srcFolder',
			message: 'Location of the source folder?',
			default: './src',
			validate: isRequired
		},
		{
			type: 'input',
			name: 'distFolder',
			message: 'Location of the distribution folder?',
			default: './dist',
			validate: isRequired,
			when(answers) {
				return ['advanced', 'pro'].includes(answers.mode);
			}
		},
		{
			name: 'library-name',
			type: 'input',
			default: appDetails.appName,
			message: 'Library name:',
			validate: input => {
				if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
				else
					return 'The library name may only include letters, numbers, underscores and hashes.';
			}
		},
		{
			name: 'library-code',
			type: 'input',
			default: appDetails.appName,
			message: 'Library code:',
			validate: input => {
				if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
				else
					return 'The library code may only include letters, numbers, underscores and hashes.';
			}
		},
		{
			name: 'initial-version',
			type: 'input',
			message: 'Initial version:',
			default: '1.0.0',
			validate: input => {
				if (semverRegex().test(input)) return true;
				else return 'The initial version must match a semantic versions such as 0.0.1';
			}
		},
		{
			type: 'input',
			name: 'appURL',
			message: 'The URL of your APEX application?',
			validate: isRequired
		}
	];
}
