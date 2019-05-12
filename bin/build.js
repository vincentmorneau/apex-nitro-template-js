const spawn = require('cross-spawn');

/**
 * @exports build
 */
module.exports = build;

/**
 * @function build
 * @param {string} buildMode - indicated the mode for the build, which is either development ("dev") or production (any other or no argument)
 * @returns {PromiseLike}
 * @description Entry point for building the project in development mode
 */
function build(buildMode) {
    return new Promise((resolve, reject) => {
        let command;
        const script = buildMode.toLowerCase() === 'dev' ? 'build-dev' : 'build';

        command = `npm run ${script}`;

        const child = spawn(command, [], { stdio: 'inherit' });
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
