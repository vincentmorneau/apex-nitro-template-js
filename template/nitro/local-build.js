const { build, test } = require('./build');
const commander = require('commander');

if (process.argv.slice(2).length > 0) {
    // Define options
    commander
        .option('-d --build', 'Build the project')
        .option('-t --test', 'Run tests')
        .parse(process.argv);

    // Take option specific action
    if (commander.build) {
        (async () => {
            await build();
        })();
    } else if (commander.test) {
        (async () => {
            await test();
        })();
    }
}
