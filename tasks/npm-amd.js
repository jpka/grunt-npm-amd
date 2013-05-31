module.exports = function(grunt) {
  grunt.registerMultiTask("npm_amd", "Browserify and wire-up NPM packages in an AMD config", function() {
    var done = this.async(),
    _ = grunt.util._,
    options = _.extend({
      properties: {
        paths: "paths",
        baseUrl: "baseUrl"
      },
      browserifyOptions: {
        ignoreMissing: true
      }
    }, this.data),
    path = require("path"),
    config = require("config-mancer").getAsStream(options.config, options.properties.paths);

    if (!options.map) {
      options.map = function(filePath) {
        var baseUrl = config.object[options.properties.baseUrl] || ".";

        filePath = path.join(path.dirname(filePath), path.basename(filePath, ".js"));
        return path.relative(baseUrl, filePath);
      };
    }

    config.on("fileWritten", function() {
      grunt.log.writeln("Updated RequireJS config with installed NPM modules".green);
      done();
    })
    .on("fileLoaded", function() {
      require("npm-amd")(options).pipe(this);
    });
  });
};
