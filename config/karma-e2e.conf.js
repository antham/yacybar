module.exports = function(config) {
  config.set({
    basePath: '../',
    files: [
      'test/e2e/**/*.js'
    ],
    singleRun: true,
    proxies: {
      '/': 'http://localhost:8000/'
    },
    junitReporter: {
      outputFile: 'test_out/e2e.xml',
      suite: 'e2e'
    },
    frameworks: ["ng-scenario","jasmine"],
    reporters: "dots"
  });
};
