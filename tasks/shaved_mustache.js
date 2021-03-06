/*
 * grunt-shaved-mustache
 * 
 *
 * Copyright (c) 2014 Ionut Staicu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  var path = require('path');

  var getNamespaceDeclaration = function(ns) {
    var output = [];
    var curPath = 'this';
    if (ns !== 'this') {
      var nsParts = ns.split('.');
      nsParts.forEach(function(curPart, index) {
        if (curPart !== 'this') {
          curPath += '[' + JSON.stringify(curPart) + ']';
          output.push(curPath + ' = ' + curPath + ' || {};');
        }
      });
    }

    return {
      namespace: curPath,
      declaration: output.join('\n')
    };
  };

  grunt.registerMultiTask('shaved_mustache', 'Make mustache templates re-usable in JS', function() {
    var options, nsInfo, content;
    var output = [];

    options = this.options({
      namespace: "Templates",
      templateOptions: { asString: true },
      defaultName: function(filename) {
        return filename;
      }
    });

    nsInfo = getNamespaceDeclaration(options.namespace);

    this.files.forEach(function(files) {
      output.push(nsInfo.namespace + ' = ' + nsInfo.namespace + ' || [];\n'  );
      files.src.forEach(function(file) {
        var src = grunt.file.read(file);
        var filename = options.defaultName(file);
        content = src.replace(/(\t|\n|\r|\s)+/g, ' ');
        content = content.replace( /\'/g,'\\\'' );
        content = "'" + content + "';\n";
        output.push(nsInfo.namespace + "[" + JSON.stringify(filename) + "] = " + content  );
      });
      grunt.file.write(files.dest, output.join("\n"));
      grunt.log.writeln("File '" + files.dest + "' created.");
      output = [];
    });

    console.log(output);

  });
};
