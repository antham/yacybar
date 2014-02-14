qmodule.exports = function(grunt) {
  grunt.initConfig({
    'crx': {
      yacybar: {
        "src": "app/",
        "dest": "build/yacybar.crx",
        "privateKey": "cert/key.pem",
      }
    },
  })

  grunt.loadNpmTasks('grunt-crx');
}
