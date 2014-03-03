'use strict';
module.exports = function (grunt) {
  grunt.initConfig({
    'crx': {
      'yacybar': {
        'src': 'app/',
        'dest': 'build/yacybar.crx',
        'privateKey': 'cert/key.pem'
      }
    },
    'karma': {
      'unit': {
        'options': {
          'configFile': 'config/karma.conf.js',
          'runnerPort': 9999,
          'browsers': ['PhantomJS']
        }
      }
    },
    'protractor': {
      'e2e': {
        'configFile': 'config/protractor.js',
        'keepAlive': false,
        'noColor': false,
        'args': {
        }
      }
    },
    'jshint': {
      'options': { 'jshintrc': '.jshintrc' },
      'all': [
        'Gruntfile.js',
        'config/*.js',
        'app/js/*.js',
        'test/**/*.js'
      ]
    },
    'exec': {
      'run-server': {
        'cwd': 'app',
        'command': './../scripts/web-server.js > /dev/null &'
      },
      'stop-server': {
        'command': 'pkill -9 -f /scripts/web-server.js',
        'stdout': false,
        'stderr': false,
        'exitCode': [0, 1]
      }
    }
  });
  grunt.loadNpmTasks('grunt-crx');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('run-tests', 'Run test suite', ['exec:stop-server', 'exec:run-server', 'karma:unit', 'protractor', 'jshint']);
};
