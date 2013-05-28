'use strict';
module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'test/*.js'
      ]
    },
    clean: {
      test: [
        'tmp',
        'npm_amd_bundles'
      ]
    },
    copy: {
      test: {
        files: {
          'tmp/config.js': 'test/fixtures/config.js',
          'tmp/baseurl-config.js': 'test/fixtures/baseurl-config.js'
        }
      }
    },
    npm_rjs: {
      standard: {
        rjsConfig: 'tmp/config.js'
      },
      baseUrl: {
        rjsConfig: 'tmp/baseurl-config.js'
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('mkdir', function (dir) {
    require('fs').mkdirSync(dir);
  });

  grunt.registerTask('test', [
                     'clean',
                     'mkdir:tmp',
                     'copy',
                     'npm_rjs',
                     'mocha',
                     'clean'
  ]);

  grunt.registerTask('mocha', function() {
    var done = this.async();
    require('child_process').exec('node_modules/.bin/mocha', function(err, stdout, stderr) {
      process.stdout.write(stdout);
      process.stderr.write(stderr);
      done();
    });
  });

  grunt.registerTask('default', ['test']);
};
