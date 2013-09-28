module.exports = function( grunt ) {
    grunt.registerMultiTask('{%= name.toLowerCase() %}', '{%= description %}', function() {

        // Iterate over all specified file groups.
        this.files.forEach(function(file) {
        
            var template, html;
            
            var src = file.src;
            var dest = file.dest;
            
            if (!grunt.file.exists(src)) {
                grunt.log.warn('Source file "' + filepath + '" not found.');
                return false;
            }

            template = grunt.file.read(filepath);
            html = grunt.template.process(template);

            // Write the destination file.
            grunt.file.write(dest, html);

            // Print a success message.
            grunt.log.writeln('File "' + dest + '" created.');
        });
    });
};
