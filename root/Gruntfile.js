/*
 * {%= name %}
 * {%= homepage %}
 *
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */

"use strict";

var prompt = require('simple-prompt');

var questions = [
    {
        question: 'view', 
        required: true
    },
    {
        question: 'database'
    }
];

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        jshint: {
            all: [
                'Gruntfile.js',
                '*.js'
            ],
            
            options: {
                jshintrc: '.jshintrc'
            }
        },
        
        name: '<%= pkg.name %>',
        
        licenses: '<%= pkg.licenses %>',
        
        database: '',
        
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
                cmd: "find ./component -name '*.php' -exec php -l {} ;",
                
                onOutData: function (data) {
                    console.log(data);
                    
                    if (data.match(/Errors parsing|PHP Parse error/g)) {
                        process.exit(1);
                    }
                },
        
                onErrData: function (data) {
                    console.log(data);
                    
                    if (data.match(/Errors parsing|PHP Parse error/g)) {
                        process.exit(1);
                    }
                }
            }
        },
        
        
        joomlajs: {
            view: {
                files: [
                    {tmpl: 'tmpl/com/model.tmpl', dest: 'component/site/models/<%= view %>.php'},
                    {tmpl: 'tmpl/com/table.tmpl', dest: 'component/site/models/tables/<%= view %>.php'},
                    {tmpl: 'tmpl/com/view.tmpl', dest: 'component/site/views/<%= view %>/view.html.php'},
                    {tmpl: 'tmpl/com/default.tmpl', dest: 'component/site/views/<%= view %>/tmpl/default.php'},
                    {tmpl: 'tmpl/com/xml.tmpl', dest: 'component/site/views/<%= view %>/tmpl/default.xml'},
                    {tmpl: 'tmpl/com/controller.tmpl', dest: 'component/site/controllers/<%= view %>.php'}
                ]
            },
            
            model: {
                files: [
                    {tmpl: 'tmpl/com/model.tmpl', dest: 'component/site/models/<%= view %>.php'},
                    {tmpl: 'tmpl/com/table.tmpl', dest: 'component/site/models/tables/<%= view %>.php'}
                ]
            },
            
            controller: {
                files: [
                    {tmpl: 'tmpl/com/controller.tmpl', dest: 'component/site/controllers/<%= view %>.php'}
                ]
            }
        }
    });
    
    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-exec');
    
    grunt.registerTask('default', ['jshint', 'exec:test', 'compress']);
    grunt.registerTask('build', ['jshint', 'exec:test', 'compress']);
    grunt.registerTask('test', ['jshint', 'exec:test']);
    
    grunt.registerTask('joomla', function (option) {
        var done = this.async(), 
            mytask = 'joomlajs';
        
        if (option) {
            mytask = mytask + ':'  + option;
        }
        else {
            mytask = 'joomlajs:view';
        }
        
        prompt(questions, function (answers) {
            grunt.config.set('view', answers.view);
            
            grunt.task.run([mytask]);
            done();
        });
    });
};

