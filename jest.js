// Jest preprocessor.
var babelJest = require('babel-jest');
var ReactTools = require('react-tools');


module.exports = {
  process: function(src, filename) {
    if (filename.indexOf('node_modules/') !== -1) {
      return src;
    }

    src = babelJest.process(src, filename);
    return ReactTools.transform(src);
  }
};
