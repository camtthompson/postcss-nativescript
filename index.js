let postcss = require('postcss')

module.exports = postcss.plugin('postcss-nativescript', function () {
  return function (root) {
    // Transform CSS AST here
    root.walkDecls(function (decl) {
      var supportedProperties = {
        "color": true,
        "background": true,
        "background-color": true,
        "placeholder-color": true,
        "background-image": true,
        "background-repeat": true,
        "background-position": true,
        "background-size": true,
        "border-color": true,
        "border-top-color": true,
        "border-right-color": true,
        "border-left-color": true,
        "border-width": true,
        "border-top-width": true,
        "border-right-width": true,
        "border-bottom-width": true,
        "border-left-width": true,
        "border-radius": true,
        "font": true,
        "font-family": true,
        "font-size": true,
        "font-style": true,
        "font-weight": true,
        "text-align": true,
        "text-decoration": true,
        "text-transform": true,
        "letter-spacing": true,
        "line-height": true,
        "z-index": true,
        "clip-path": true,
        "vertical-align": true,
        "horizontal-align": true,
        "margin": true,
        "margin-top": true,
        "margin-right": true,
        "margin-bottom": true,
        "margin-left": true,
        "width": true,
        "height": true,
        "min-width": true,
        "min-height": true,
        "padding": true,
        "padding-top": true,
        "padding-right": true,
        "padding-left": true,
        "padding-bottom": true,
        "visibility": true,
        "opacity": true
      };
      var units = ['px', 'rem', 'em', '%'];

      // Remove !important property in the css
      if (decl.important) {
        decl.important = false;
      }

      // Remove all properties not supported by NativeScript
      if (!supportedProperties[decl.prop]) {
        decl.remove();
      }

      // Remove all units on the end of the value, besides % on width.
      for (unit of units) {
        if (decl.prop === 'width' && unit === '%') {
          // Do Nothing
        } else if (decl.value.includes(unit)) {
          decl.value = decl.value.split(unit).join("");
        }
      }
    });

    // Remove Media Queries
    root.walkAtRules(atRule => {
      atRule.remove();
    });
  };
});