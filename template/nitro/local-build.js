const { build, jsdoc, lint, test } = require('./build');
const commander = require('commander');

if (process.argv.slice(2).length > 0) {
    // Define options
    commander
        .option('-d --build', 'Build the project')
        .option('-j --jsdoc', 'Create the JSDoc documentation')
        .option('-l --lint', 'Lint the project')
        .option('-t --test', 'Run tests')
        .parse(process.argv);

    // Take option specific action
    if (commander.build) {
        (async () => {
            await build();
        })();
    } else if (commander.jsdoc) {
        (async () => {
            await jsdoc();
        })();
    } else if (commander.lint) {
        (async () => {
            await lint();
        })();
    } else if (commander.test) {
        (async () => {
            await test();
        })();
    }
}
