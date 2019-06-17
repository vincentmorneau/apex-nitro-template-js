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
async function init(appDetails) {
    // Create template config with defaults
    const config = {
        projectName: appDetails.appName,
        libraryCode: appDetails.appName,
        main: './src/main.js',
        globals: {
            apex: 'apex'
        },
        srcFolder: './src',
        distFolder: './build',
        external: ['apex'],
        cssExtensions: ['.css'],
        version: '1.0.0'
    };

    if (appDetails.suppressInquiry) {
        return config;
    }

    // Ask questions
    const answers = await inquirer.prompt(getTemplateQuestions(appDetails));

    // Set main answers
    config.projectName = answers['project-name'];
    config.appUrl = answers['app-url'];
    if (answers['use-preprocessors']) {
        combinedExtenstions = [...config.cssExtensions, ...answers['preprocessors']];
        config.cssExtensions = [].concat(...combinedExtenstions); // Flatten array
    }

    return config;
}

/**
 * @private
 */
function isRequired(input) {
    if (input !== '') {
        return true;
    }
    return 'Required.';
}

/**
 * @private
 */
function getTemplateQuestions(appDetails) {
    return [
        {
            name: 'project-name',
            type: 'input',
            default: appDetails.appName,
            message: 'Project name:',
            validate: (input) => {
                if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                else return 'The project name may only include letters, numbers, underscores and hashes.';
            }
        },
        {
            name: 'library-code',
            type: 'input',
            default: appDetails.appName,
            message: 'Library code:',
            validate: (input) => {
                if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                else return 'The library code may only include letters, numbers, underscores and hashes.';
            }
        },
        {
            name: 'use-preprocessors',
            type: 'confirm',
            message: 'Use CSS Preprocessors?',
            default: false
        },
        {
            name: 'preprocessors',
            type: 'checkbox',
            message: 'Choose CSS Preprocessors',
            choices: [
                { name: 'Less', value: ['.less'] },
                { name: 'Sass', value: ['scss', '.sass'] },
                { name: 'Stylus', value: ['.styl '] }
            ],
            when(answers) {
                return answers.usePreprocessors;
            }
        }
    ];
}
