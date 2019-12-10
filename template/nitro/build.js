const spawn = require('cross-spawn');
const chalk = require('chalk');

/**
 * @exports stages
 */
module.exports = {
    build,
    test,
};

async function test() {
    try {
        console.log(chalk.cyan('=> executing tests'), process.cwd());
        await runCommand('npx', ['ava'], 'inherit');
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
