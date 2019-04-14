// optional imports for apex and jQuery, remove if you do not need them
// copy into any file where you do need them
import apex from 'apex';
const $ = apex.jQuery;

// import of the main less file containing your styles
// you may remove this import if you do not want to bundle styles
import './css/main.less';

// main information about the project
// name and version will be injected during the build
export const projectInfo = {
    name: 'NPM_PACKAGE_PROJECT_NAME',
    version: 'NPM_PACKAGE_PROJECT_VERSION',
};

/***************************************************************************************/

// Your code goes here:
// - export all variables/ objects/ functions that should be exposed in your library
// - define your library code and project name in "package.json" file
// - check the examples folder on how to expose properties to your library
// example function:
/**
 * @function greet
 * @description A hello world example
 */
export function greet(name) {
    console.log(`Hello, ${name}`);
}
