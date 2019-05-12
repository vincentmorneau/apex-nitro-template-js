const spawn = require('cross-spawn');

/**
 * @exports build
 */
module.exports = build;

/**
 * @function build
 * @param {string} mode - build mode, either "p" for production or "d" for development, default = "p"
 * @returns {PromiseLike}
 * @description Entry point for building the project in development mode
 */
function build(mode) {
    return new Promise((resolve, reject) => {
        let command;
        const script = mode === 'd' ? 'build-dev' : 'build';

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
