'use strict';
module.exports = function(config) {
  config.set({
    basePath: '../',
    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-route/angular-route.min.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'app/bower_components/angular-cookies/angular-cookies.min.js',
      'app/bower_components/uri.js/src/URI.js',
      'app/bower_components/x2js/xml2json.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'test/lib/chrome/chrome.js',
      'app/js/**/*.js',
      'test/unit/**/*.js'
    ],
    singleRun: true,
    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },
    frameworks: ['jasmine'],
    reporters: 'dots'
  });
};
