/*
 * {%= name %}
 * {%= homepage %}
 *
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */

'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    compress: {
        template: {
            options: {
                archive: './com_' + <%= name.toLowerCase() %> + '/js_wright.zip'
            },
            
            files: [
                {cwd: './com_' + <%= name.toLowerCase() %> + '/', src: ['**/*'], expand: true, dest: ''}, // includes files in path and its subdirs
            ]
        }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-compress');
  
  grunt.registerTask('default', ['compress']);
};

