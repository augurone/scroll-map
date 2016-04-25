module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: grunt.file.readYAML('jshint.yml'),
      gruntfile: 'Gruntfile.js',
      scripts: 'src/js/*.js'
    },
    jscs: {
      src: "<%=jshint.scripts%>",
      options: {
        preset: 'crockford'
      }
    },
    watch: {
      gruntfile: {
        files: '<%=jshint.gruntfile%>',
        tasks: ['jshint:gruntfile']
      },
      scripts: {
        files: '<%=jshint.scripts%>',
        tasks: ['jshint:scripts']
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('test', ['jshint', 'jscs']);
};
