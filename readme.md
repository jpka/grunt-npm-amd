## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-npm-requirejs --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-npm-requirejs');
```

[grunt]: http://gruntjs.com
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md


## Example usage

```js
grunt.initConfig({
	npm_rjs: {
		target: {
			rjsConfig: 'app/config.js'
		}
	}
});

grunt.loadNpmTasks('grunt-npm-requirejs');

grunt.registerTask('default', ['npm_rjs']);
```


## Documentation

When the `npm_rjs` task is run it bundles installed NPM modules with [browserify](http://github.com/substack/browserify) via [NPM-AMD](http://github.com/jpka/npm-amd) and merges the bundles paths into the `paths` property of your RequireJS config. Also it will detect AMD entries and just point the configuration to it, instead of doing pointless browserifying ;)

You trigger this task from another task in your Gruntfile or through the CLI: `grunt npm_rjs`


### rjsConfig

**Required**  
Type: `String`

Specify a relative path to your RequireJS config.

Make sure to specify the `baseUrl` property in your RequireJS config if you want to use relative paths.

### browserifyOptions

**Optional**
Type: `Object`

Options to pass to [browserify](http://github.com/substack/node-browserify)

### force

**Optional**  
Type: `Boolean`
Default: `false`

Disable caching by forcing the browserify on every NPM module. Otherwise it will use the cached version of every previously browserified module, given it is the same version and was bundled with the same browserify options.


## Things to remember

You need to already have a config.js file at the location specified by `rjsConfig`. At a minimum, the file should look like this:

``` js
requirejs.config({});
```

You still need to create a path for *your* js files. The grunt task will only create paths for installed NPM modules.

``` js
requirejs.config({
	baseUrl: './',
	paths: {
		myComponent: 'js/myComponent.js'
	}
});
```

The task does not overwrite the config file, it just adds additional paths to it. So paths you add will be preserved. Keep in mind that if you change or remove one of your NPM dependencies after you've run the task, that path will still exist in the config file and you'll need to manually remove it.
