const { runCommand } = require('./commandRunner');

/**
 * @exports buildSteps
 */
module.exports = {
    launchBuild,
    publishBuild,
    bundleDev,
    bundleProd,
    lint,
    jsdoc,
    test,
};

/**
 * @function launchBuild
 * @returns {PromiseLike}
 * @description Entry point for apex-nitro for building the project
 */
async function launchBuild() {
    await lint();
    await bundleDev();
    await bundleProd();
}

/**
 * @function publishBuild
 * @returns {PromiseLike}
 * @description Entry point for apex-nitro for building the project
 */
async function publishBuild() {
    await lint();
    await test();
    await jsdoc();
    await bundleDev();
    await bundleProd();
}

function bundleDev() {
    return runCommand('npx', ['rollup', '-c', './rollup.config.js', '--environment', 'BUILD:dev']);
}

function bundleProd() {
    return runCommand('npx', ['rollup', '-c', './rollup.config.js', '--environment', 'BUILD:production']);
}

function lint() {
    return runCommand(
        'npx',
        ['eslint', '-c', '.eslintrc.json', '--ignore-path', '.eslintignore', './src/'],
        'inherit'
    );
}

function jsdoc() {
    return runCommand('npx', ['jsdoc', '-c', './jsdoc.conf', '-d', './dist/doc', '-R', './README.md']);
}

function test() {
    return runCommand('npx', ['ava', './test/**/*.test.js'], 'inherit');
}
