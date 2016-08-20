import '../styles/styles.scss';
import forcePolyfill from 'classlist-toggle-force-polyfill';
import './app.js';

NodeList.prototype.forEach = Array.prototype.forEach; // Add foreach to NodeList to use with querySelectAll
if(forcePolyfill.required(true)) { // Check if classList.toggle(class, force) polyfill is needed
    forcePolyfill.fix(); // Apply classList.toggle(class, force) polyfill
}

// Compiles all images
require.context('../img/', true, /\.(jpe?g|png|gif)$/);

// Compiles all vectors to one svg file
const files = require.context('../svg/', true, /^\.\/.*\.svg$/);
files.keys().forEach(files);