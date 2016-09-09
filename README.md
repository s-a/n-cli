# n-cli [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> a usefull toolset for node commandline applications

## Installation

```sh
$ npm install --save n-cli
```

## Usage

```js
#!/usr/bin/env node

"use strict";

var cli = new require("CLI")({
    appname: "node-cli-example-app-1",
    handleUncaughtException : true
});

cli.on("unicorn", function(){
    this.argv.notNull("rainbow");
    this.log(this);
});
```
```sh
$ your-client-app unicorn --rainbow forever;

# yields :
{ 
  prettyError:
   PrettyError { },
  init:
   { appname: 'node-cli-example-app-1',
     handleUncaughtException: true },
  argv: { _: [ 'unicorn' ], rainbow: 'e', notNull: [Function: bound ] },
  config:
   { settings: {},
     appFolder: 'c:\\git\\n-cli\\examples',
     appPackageFilename: 'c:\\git\\n-cli\\examples\\package.json',
     appPackage: {},
     appName: 'node-cli-example-app-1',
     dataFolder: 'C:\\Users\\User\\AppData\\Roaming\\node-cli-example-app-1',
     filename: 'C:\\Users\\User\\AppData\\Roaming\\node-cli-example-app-1\\config.json' },
  color:
   Chalk { },
  Error: [Function: NodeCliError],
  minimist: [Function]
}
```
```sh
$ your-client-app unicorn --rainbow ;

# yields : missing-parameter-value missing value for parameter rainbow.
```
## License

MIT © [s-a](https://github.com/s-a)


[npm-image]: https://badge.fury.io/js/n-cli.svg
[npm-url]: https://npmjs.org/package/n-cli
[travis-image]: https://travis-ci.org/s-a/n-cli.svg?branch=master
[travis-url]: https://travis-ci.org/s-a/n-cli
[daviddm-image]: https://david-dm.org/s-a/n-cli.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/s-a/n-cli
[coveralls-image]: https://coveralls.io/repos/s-a/n-cli/badge.svg
[coveralls-url]: https://coveralls.io/r/s-a/n-cli
