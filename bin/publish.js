const spawn = require('cross-spawn');

/**
 * @exports publish
 */
module.exports = publish;

/**
 * @function publish
 * @returns {PromiseLike<Boolean>} - The resolve method returns true, if the standard build of Apex-nitro should be used. If false is returned, only the build in this method will be executed.
 * @description Entry point for publishing the build files
 */
async function publish() {
    // run production build before publishing files
    await new Promise((resolve, reject) => {
        let command;
        command = `npm run build`;

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

    // no template specific publish implementation is used
    // referring back to nitro to use the default publish method to APEX
    return Promise.resolve(true);
}
