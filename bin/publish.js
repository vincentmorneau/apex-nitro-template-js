/**
 * @exports publish
 */
module.exports = publish;

/**
 * @function publish
 * @returns {PromiseLike<Boolean>} - The resolve method returns true, if the standard build of Apex-nitro should be used. If false is returned, only the build in this method will be executed.
 * @description Entry point for publishing the build files
 */
function publish() {
    // no template specific publish implementation is used
    // refering back to nitro to use the default publish method to APEX
    return Promise.resolve(true);
}
