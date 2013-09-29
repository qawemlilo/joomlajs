/*
 * grunt-init-joomlajs
 * https://github.com/qawemlilo/joomlajs
 *
 * Copyright (c) 2013 Qawelesizwe
 * Licensed under the MIT license.
 */

"use strict";

// Basic template description.
exports.description = 'Create a Joomla! component.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'For more information about how to use this template, ' +
  'please visit https://github.com/qawemlilo/joomlajs';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';


var toCamelCase = function(txt) {
    function toUpperCaseFirst(word) {
          word = word.toLowerCase();
            
          return word.charAt(0).toUpperCase() + word.slice(1);
    }
        
    var words = [];
        
    if (txt.indexOf('-') >= 0) {
        txt = txt.replace(/ /g, ' ');
    }
        
    if (txt.indexOf(' ') >= 0) {
        words = txt.split(' ');
	    
        words.forEach(function (word) {
            words.push(toUpperCaseFirst(word))  
        });
            
        return toUpperCaseFirst(txt);
    }
        
    return words
};


// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'grunt'}, 
  [
      // Prompt for these values.
      init.prompt('name', function(value, props, done) {
          
          // Prepend grunt- to default name.
          var name = toCamelCase(value);
      
          // Replace 'grunt-contrib' with 'grunt' and give a warning
          done(null, name);
      }),
    
      init.prompt('description', 'The best Grunt plugin ever.'),
    
      init.prompt('version'),
      
      init.prompt('repository'),
      
      init.prompt('homepage'),
      
      init.prompt('bugs'),
      
      init.prompt('licenses'),
      
      init.prompt('author_name'),
      
      init.prompt('author_email'),
      
      init.prompt('author_url'),
      
      init.prompt('grunt_version'),
      
      init.prompt('node_version', grunt.package.engines.node)
  ], 
  
  function(err, props) {
      
      // Set a few grunt-plugin-specific properties.
      props.short_name = props.name.replace(/^grunt[\-_]?/, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
      props.main = 'Gruntfile.js';
      props.npm_test = 'grunt test';
      props.keywords = ['gruntplugin'];
      props.devDependencies = {
          'grunt-contrib-compress': '~0.5.2',
          "grunt-exec": "~0.4.2",
      };
      props.peerDependencies = {
          'grunt': props.grunt_version,
      };

      // Files to copy (and process).
      var files = init.filesToCopy(props);

      // Add properly-named license files.
      init.addLicenseFiles(files, props.licenses);

      // Actually copy (and process) files.
      init.copyAndProcess(files, props, {noProcess: 'tools/**'});

      // Generate package.json file.
      init.writePackageJSON('package.json', props);

      // All done!
      done();
  });

};
