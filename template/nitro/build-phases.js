const spawn = require('cross-spawn');

/**
 * @exports stages
 */
module.exports = {
    buildDev,
    buildProd,
    bundleDev,
    bundleProd,
    lint,
    jsdoc,
    test,
};

/**
 * @function buildDev
 * @returns {PromiseLike}
 * @description Entry point for apex-nitro for building the project
 */
async function buildDev() {
    let phaseValid = await lint();
    if (!phaseValid) {
        return false;
    }

    phaseValid = await bundleDev();
    return phaseValid;
}

/**
 * @function buildProd
 * @returns {PromiseLike}
 * @description Entry point for apex-nitro for building the project
 */
async function buildProd() {
    let phaseValid = await lint();
    if (!phaseValid) {
        return false;
    }

    phaseValid = await test();
    if (!phaseValid) {
        return false;
    }

    phaseValid = await jsdoc();
    if (!phaseValid) {
        return false;
    }

    phaseValid = await bundleProd();
    return phaseValid;
}

async function bundleDev() {
    try {
        await runCommand('npx', ['rollup', '-c', './rollup.config.js', '--environment', 'BUILD:dev']);
        return true;
    } catch (err) {
        return false;
    }
}

async function bundleProd() {
    try {
        await runCommand('npx', ['rollup', '-c', './rollup.config.js', '--environment', 'BUILD:production']);
        return true;
    } catch (err) {
        return false;
    }
}

async function lint() {
    try {
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

async function jsdoc() {
    try {
        await runCommand('npx', ['jsdoc', '-c', './jsdoc.conf', '-d', './dist/doc', '-R', './README.md']);
        return true;
    } catch (err) {
        return false;
    }
}

async function test() {
    try {
        await runCommand('npx', ['ava', './test/**/*.test.js'], 'inherit');
        return true;
    } catch (err) {
        return false;
    }
}

function runCommand(command, args, stdioSetting = ['ignore', 'ignore', process.stderr]) {
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
