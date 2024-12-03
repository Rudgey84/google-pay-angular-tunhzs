var concat = require('concat');
concat(
  ['./dist/runtime.js', './dist/polyfills.js', './dist/main.js'],
  './dist/my-app.js'
);
