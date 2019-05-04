const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
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
    if (appDetails.suppressInquiry) {
        const appDetails = {
            appName: appDetails.appName,
            appPath: appDetails.appPath,
            code: appDetails.appName,
            version: '1.0.0',
        };
        writeappDetails(appDetails);
        return Promise.resolve('done');
    } else {
        console.log('Please answer the following questions:');
        return inquirer.prompt(getQuestions(appDetails)).then(answers => {
            return new Promise((resolve, reject) => {
                try {
                    resolve({
                        libraryName: answers['library-name'],
                        libraryCode: answers['library-code'],
                        main: './src/main.js',
                        globals: {
                            apex: 'apex',
                        },
                        external: ['apex'],
                        cssExtensions: ['.css', '.less'],
                        targets: 'last 2 versions, >0.25%, not dead',
                        version: answers['version'],
                    });
                } catch (err) {
                    reject(err);
                }
            });
        });
    }
}

/**
 * @private
 */
function getQuestions(appDetails) {
    return [
        {
            name: 'library-name',
            type: 'input',
            default: appDetails.appName,
            message: 'Library name:',
            validate: input => {
                if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                else return 'The library name may only include letters, numbers, underscores and hashes.';
            },
        },
        {
            name: 'library-code',
            type: 'input',
            default: appDetails.appName,
            message: 'Library code:',
            validate: input => {
                if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                else return 'The library code may only include letters, numbers, underscores and hashes.';
            },
        },
        {
            name: 'initial-version',
            type: 'input',
            message: 'Initial version:',
            default: '1.0.0',
            validate: input => {
                if (semverRegex().test(input)) return true;
                else return 'The initial version must match a semantic versions such as 0.0.1';
            },
        },
    ];
}
