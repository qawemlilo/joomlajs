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
    
    name: '<%= pkg.name %>',
    
    view: '',
    
    compress: {
        template: {
            options: {
                archive: "build/com_<%= pkg.name.toLowerCase() %>.zip"
            },
            
            files: [
                {cwd: 'component/', src: ['**/*'], expand: true, dest: ''}, // includes files in path and its subdirs
            ]
        }
    },
    
    exec: {
        test: {
            cmd: "find ./component '*.php' -exec php -l {} \;"
        }
    },
    
    joomlajs: {
        model: {          
            files: [
                {tmpl: 'tools/tmpl/model.tmpl', dest: 'component/site/models/<%= view %>.php'},
                {tmpl: 'tools/tmpl/table.tmpl', dest: 'component/site/models/tables/<%= view %>.php'}
            ]
        },
        
        view: {          
            files: [
                {tmpl: 'tools/tmpl/view.tmpl', dest: 'component/site/views/<%= view %>/view.html.php'},
                {tmpl: 'tools/tmpl/default.tmpl', dest: 'component/site/views/<%= view %>/tmpl/default.php'},
                {tmpl: 'tools/tmpl/xml.tmpl', dest: 'component/site/views/<%= view %>/tmpl/default.xml'}
            ]
        },
        
        controller: {          
            files: [
                {tmpl: 'tools/tmpl/controller.tmpl', dest: 'component/site/controllers/<%= view %>.php'}
            ]
        }
    },
  });
  
  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-exec');
  
  grunt.registerTask('default', ['compress']);
  grunt.registerTask('build', ['exec:test', 'compress:template']);
  grunt.registerTask('joomla', ['joomlajs']);
};

