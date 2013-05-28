'use strict';
var npm_amd = require("npm-amd"),
chai = require("chai"),
expect = chai.expect,
should = chai.should(),
fs = require("fs"),
path = require("path"),
inspectConfig = function(file, cb) {
  require("requirejs").tools.useLib(function(require) {
    cb(require("parse").findConfig(fs.readFileSync(file, "utf8")).config);
  });
},
nodeModules = fs.readdirSync("node_modules").filter(function(name) {
  if (name === ".bin") return false;
  return true;
});

describe("grunt-npm-requirejs", function() {
  var paths;

  before(function(done) {
    inspectConfig("tmp/config.js", function(config) {
      paths = config.paths;
      done();
    });
  });

  it("maps all modules", function() {
    nodeModules.forEach(function(name) {
      var filePath = paths[name];

      expect(filePath).to.exist;
    });
  });

  it("removes .js extension from paths", function() {
    nodeModules.forEach(function(key) {
      expect(require("path").extname(paths[key])).to.not.equal(".js");
    });
  });

  it("maps to actual files resolved from process dir", function() {
    nodeModules.forEach(function(key) {
      var filePath = paths[key];

      path.relative(process.cwd(), filePath).should.equal(filePath);
      fs.existsSync(path.resolve(filePath + ".js")).should.be.true;
    });
  });

  it("resolves the files from baseUrl when it is specified", function(done) {
    inspectConfig("tmp/baseurl-config.js", function(config) {
      nodeModules.forEach(function(key) {
        fs.existsSync(path.resolve(config.baseUrl, config.paths[key] + ".js")).should.be.true;
      });
      done();
    });
  });
});
