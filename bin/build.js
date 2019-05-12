const spawn = require('cross-spawn');

/**
 * @exports build
 */
module.exports = build;

/**
 * @function build
 * @returns {PromiseLike}
 * @description Entry point for building the project in development mode
 */
function build() {
    return new Promise((resolve, reject) => {
        let command = 'npm';

        const child = spawn(command, ['run', 'build'], { cwd: process.cwd(), stdio: 'inherit' });
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
