const { launchBuild, publishBuild, bundleDev, bundleProd, jsdoc, lint, test } = require('../lib/builds');
const commander = require('commander');

if (process.argv.slice(2).length > 0) {
    // Define options
    commander
        .version('0.0.1')
        .option('-l --launch-build', 'Build the project in development mode')
        .option('-p --publish-build', 'Build the project in production mode')
        .option('-d --bundle-dev', 'Bundle the project in development mode')
        .option('-r --bundle-prod', 'Bundle the project in production mode')
        .option('-j --jsdoc', 'Create the JSDoc documentation')
        .option('-l --lint', 'Lint the project')
        .option('-t --test', 'Run tests')
        .parse(process.argv);

    // Take option specific action
    if (commander.launchBuild) {
        (async () => {
            await launchBuild();
        })();
    } else if (commander.publishBuild) {
        (async () => {
            await publishBuild();
        })();
    } else if (commander.bundleDev) {
        (async () => {
            await bundleDev();
        })();
    } else if (commander.bundleProd) {
        (async () => {
            await bundleProd();
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
} else {
    // Default action, when no option is given
    (async () => {
        await launchBuild();
    })();
}
