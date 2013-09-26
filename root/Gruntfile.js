/*
 * {%= name %}
 * {%= homepage %}
 *
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */

"use strict";

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    compress: {
        template: {
            options: {
                archive: "./build/com_<%= pkg.name.toLowerCase() %>.zip"
            },
            
            files: [
                {cwd: './component/', src: ['**/*'], expand: true, dest: ''}, // includes files in path and its subdirs
            ]
        }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-compress');
  
  grunt.registerTask('default', ['compress']);
  grunt.registerTask('build', ['compress:template']);
};

