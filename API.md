# Global





* * *

## Class: CLI


**.prettyError**: `PrettyError` , Instance of [https://github.com/AriaMinaei/pretty-error](https://github.com/AriaMinaei/pretty-error)  .
**.argv**: `object` , Parsed result of [https://github.com/substack/minimist](https://github.com/substack/minimist)  .
**.color**: `Chalk` , Instance of [https://github.com/chalk/chalk](https://github.com/chalk/chalk)  .
**.Error**: `CLI.Error` , Constructor to create a new instance of custom n-cli Error  .
**.minimist**: `Minimist` , Instance of [https://github.com/substack/minimist](https://github.com/substack/minimist)  .
**.config**: `user-appdata` , Instance of ```user-appdata``` [https://github.com/s-a/user-appdata](https://github.com/s-a/user-appdata)
### CLI.resolvePath(fileOrDir) 

Resolve a path

**Parameters**

**fileOrDir**: `string`, Filename or directory

**Returns**: `string`, Absolute directory name relative to the current working directory of process.

### CLI.findup(basedir, filename) 

Find a file in parent directories.

**Parameters**

**basedir**: `string`, In most cases the current directory of process.

**filename**: `string`, Filename to find.

**Returns**: `string`, Absolute directory to given ```filename```.

### CLI.programInfo() 

Output program informations based on ```package.json``` to console.


### CLI.on(commandName, commandFunction) 

Catch a commandline switch case. The commandFunction runs in context of CLI.

**Parameters**

**commandName**: `string`, A command you want to process. For example ```push``` or ```commit```.

**commandFunction**: `function`, An event handler function.


### CLI.silent() 

Determines of console app is running in silent mode. Silent mode activates automaticaly when ```process.env.NODE_ENV === "test"```.


### CLI.log() 

Like console.log put implements util.inspect.


### CLI.error() 

Like console.error put implements util.inspect.


### CLI.stdout() 

Wrapper for process.stdout.write


### CLI.stderr() 

Wrapper for process.stderr.write




* * *










