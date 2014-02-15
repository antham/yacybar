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
          'browsers': ['Chrome']
        }
      },
      'e2e': {
        'options': {
          'configFile': 'config/karma-e2e.conf.js',
          'runnerPort': 9999,
          'browsers': ['Chrome']
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
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
};
