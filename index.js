let postcss = require('postcss')

module.exports = postcss.plugin('postcss-nativescript', (options = {}) => {
  return css => {
      css.walkDecls(decl => {
          decl.important = false;
      });
  };
});