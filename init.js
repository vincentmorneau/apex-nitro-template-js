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
        libraryName: appDetails.appName,
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
    config.appUrl = answers['app-url'];
    config.cssExtensions = [].concat(...answers['css-extensions']); // Flatten array

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
            name: 'css-extensions',
            type: 'list',
            message: 'CSS pre-processors?',
            choices: [
                { name: 'CSS only', value: ['.css'] },
                new inquirer.Separator(),
                { name: 'Less', value: ['.less'] },
                { name: 'Sass', value: ['scss', '.sass'] },
                { name: 'Stylus', value: ['.styl '] }
            ],
            default: ['.css']
        }
    ];
}
