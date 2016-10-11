# CLI



**Requires:**

+ module:[https://github.com/AriaMinaei/pretty-error](https://github.com/AriaMinaei/pretty-error)
+ module:[https://github.com/substack/minimist](https://github.com/substack/minimist)
+ module:[https://github.com/chalk/chalk](https://github.com/chalk/chalk)
+ module:[https://github.com/s-a/user-appdata](https://github.com/s-a/user-appdata)


* * *

## Class: CLI


**prettyError**:  
**argv**:  
**chalk**:  
**Error**:  
**Minimist**:  
**config**:  , Instance of ```user-appdata``` [https://github.com/s-a/user-appdata](https://github.com/s-a/user-appdata)
### CLI.CLI.resolvePath(fileOrDir) 

Resolve a path

**Parameters**

**fileOrDir**: `string`, Filename or directory

**Returns**: `string`, Absolute directory name relative to the current working directory of process.

### CLI.CLI.findup(basedir, filename) 

Find a file in parent directories.

**Parameters**

**basedir**: `string`, In most cases the current directory of process.

**filename**: `string`, Filename to find.

**Returns**: `string`, Absolute directory to given ```filename```.

### CLI.CLI.programInfo() 

Output program informations based on ```package.json``` to console.


### CLI.CLI.on(commandName, commandFunction) 

Catch a commandline switch case. The commandFunction runs in context of CLI.

**Parameters**

**commandName**: `string`, A command you want to process. For example ```push``` or ```commit```.

**commandFunction**: `function`, An event handler function.


### CLI.CLI.silent() 

Determines of console app is running in silent mode. Silent mode activates automaticaly when ```process.env.NODE_ENV === "test"```.


### CLI.CLI.log() 

Like console.log put implements util.inspect.


### CLI.CLI.error() 

Like console.error put implements util.inspect.


### CLI.CLI.stdout() 

Wrapper for process.stdout.write


### CLI.CLI.stderr() 

Wrapper for process.stderr.write




* * *










