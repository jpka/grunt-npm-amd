Grunt task to automatize the use of [browserify](http://github.com/substack/browserify) for NPM modules in your AMD/RequireJS projects.

## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-npm-amd --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-npm-amd');
```

[grunt]: http://gruntjs.com
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md


## Example usage

```js
grunt.initConfig({
	npm_amd: {
		target: {
			config: 'app/config.js'
		}
	}
});

grunt.loadNpmTasks('grunt-npm-requirejs');

grunt.registerTask('default', ['npm_amd']);
```


## Documentation

When the `npm_amd` task is run it bundles installed NPM modules with [browserify](http://github.com/substack/browserify) via [NPM-AMD](http://github.com/jpka/npm-amd) and merges the bundle paths into the `paths` property of your AMD config file. Also it will detect AMD entries and just point the configuration to it, instead of doing pointless browserifying ;)

You trigger this task from another task in your Gruntfile or through the CLI: `grunt npm_amd`

**Note**: The default options work for RequireJS-compatible config files, such as the ones for [RequireJS](http://requirejs.org/) and [curl](https://github.com/cujojs/curl), but you can tune it to work with pretty much anything.

### config

**Required**  
Type: `String`

Specify a relative path to your RequireJS config.

Make sure to specify the `baseUrl` property in your config file if you want to use relative paths.

### properties

**Optional**
Type: `Object`
Default: 
```javascript
{
  baseUrl: "baseUrl",
  paths: "paths"
}
```

Property names to look for when patching up the config file. Declare this to support other AMD loaders.

### [NPM-AMD](http://github.com/jpka/npm-amd) options.

Watch that space.


## Things to remember

- You need to already have a config file at the location specified by `config`. For example, for RequireJS you need to have at least the following:

```javascript
requirejs.config({});
```

- The task does not overwrite the config file, it just adds additional paths to it. So paths you add will be preserved. Keep in mind that if you change or remove one of your NPM dependencies after you've run the task, that path will still exist in the config file and you'll need to manually remove it.
