const spawn = require('cross-spawn');
const chalk = require('chalk');

/**
 * @exports stages
 */
module.exports = {
    build,
    lint,
    jsdoc,
    test,
};

async function lint() {
    try {
        console.log(chalk.cyan('=> linting source code'));
        await runCommand(
            'npx',
            ['eslint', '-c', '.eslintrc.json', '--ignore-path', '.eslintignore', './src/'],
            'inherit'
        );
        return true;
    } catch (err) {
        return false;
    }
}

async function test() {
    try {
        console.log(chalk.cyan('=> executing tests'), process.cwd());
        await runCommand('npx', ['ava'], 'inherit');
        return true;
    } catch (err) {
        return false;
    }
}

async function jsdoc() {
    try {
        console.log(chalk.cyan('=> generating API documentation'));
        await runCommand('npx', ['jsdoc', '-c', './jsdoc.conf', '-d', `./doc`, '-R', './README.md']);
        return true;
    } catch (err) {
        return false;
    }
}

/**
 * @function build
 * @returns {Promise}
 * @description Entry point for apex-nitro for building the project
 */
async function build() {
    // let valid = await lint();
    // if (!valid) {
    //     return false;
    // }

    // valid = await test();
    // if (!valid) {
    //     return false;
    // }

    // valid = await jsdoc();
    // if (!valid) {
    //     return false;
    // }

    try {
        console.log(chalk.cyan('=> bundling files'));
        await runCommand('npx', ['rollup', '-c']);
        console.log('');
        return true;
    } catch (err) {
        return false;
    }
}

function runCommand(command, args, stdioSetting = 'inherit') {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, {
            cwd: process.cwd(),
            stdio: stdioSetting,
        });
        child.on('close', code => {
            if (code !== 0) {
                reject({
                    command: `${command} ${args.join(' ')}`,
                });
                return;
            }
            resolve('done');
        });
    });
}
