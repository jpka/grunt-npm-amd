var npm_amd = require("npm-amd"),
chai = require("chai"),
expect = chai.expect,
should = chai.should(),
fs = require("fs"),
path = require("path"),
configMancer = require("config-mancer"),
nodeModules = fs.readdirSync("node_modules").filter(function(name) {
  return name !== ".bin";
});

describe("grunt-npm-amd", function() {
  var paths;

  before(function(done) {
    configMancer.get("tmp/config.js", function(err, config) {
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
    configMancer.get("tmp/baseurl-config.js", function(err, config) {
      nodeModules.forEach(function(key) {
        fs.existsSync(path.resolve(config.baseUrl, config.paths[key] + ".js")).should.be.true;
      });
      done();
    });
  });
});
