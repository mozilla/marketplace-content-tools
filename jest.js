// Jest preprocessor.
var babelJest = require('babel-jest');
var ReactTools = require('react-tools');


module.exports = {
  process: function(src, filename) {
    src = babelJest.process(src, filename);
    return ReactTools.transform(src);
  }
};
