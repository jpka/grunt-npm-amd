"use strict";
module.exports = function(grunt) {

  grunt.registerMultiTask("npm_rjs", "Browserify and wire-up NPM packages in RJS config", function() {
    var done = this.async(),
    targetData = this.data;

    require("requirejs").tools.useLib(function (require) {
      var filePath = targetData.rjsConfig,
      fileContents = grunt.file.read(filePath),
      info = require("parse").findConfig(fileContents),
      config = info.config;

      require("npm-amd")({
        from: config.baseUrl || ".",
        force: targetData.force,
        browserifyOptions: targetData.browserifyOptions
      }, function (err, paths) {
        grunt.util._.forOwn(paths, function(value, key) {
          var path = require("path");

          value = path.join(path.dirname(value), path.basename(value, ".js"));
          config.paths[key] = value;
        });

        config = require("transform").serializeConfig(config, 
          fileContents, info.range[0], info.range[1], {
          quote: info.quote
        });
        grunt.file.write(filePath, config);
        grunt.log.writeln("Updated RequireJS config with installed NPM modules".green);
        done();
      });
    });
  });
};
