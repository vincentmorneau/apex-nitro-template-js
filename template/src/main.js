// Import your css files or any installed node package.
// (you may import .less or other file extensions for CSS preprocessing, if you support them in your project)
import './main.css';

// Optional imports of the apex library, including jQuery. Uncomment if needed in this file
//import apex from 'apex';
//const $ = apex.jQuery;

/***************************************************************************************/

// Your code goes here. Export all variables/ objects/ functions that should be part of your library.
// Example function:
/**
 * @function greet
 * @description A hello world example
 * @param {string} name - Name of the person to greet
 */
export function greet(name) {
    console.log(`Hello, ${name}!`);
}
