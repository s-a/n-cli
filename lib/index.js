

"use strict";

var minimist = require("minimist");
var E = require("./error.js");
var fs = require("fs");
var path = require("path");
var chalk = require("chalk");
var util = require("util");
var Config = require("user-appdata");
var PrettyError = require("pretty-error");

var argvNotNull = function(key){
  if (this[key] === undefined){
      throw new E("missing-parameter", key)
  }
  if (this[key] === true){
      throw new E("missing-parameter-value", "missing value for parameter " + key + ".")
  }
  return this[key];
}

/**
 * @class CLI 
 
 * @property {object}  defaults               - The default values for parties.
 * @param {object} config - configuration.
 * @example 
 * {
 *   silent: false,
 *   handleUncaughtException : true
 * }
 * @method CLI 
 * .prettyError Returns an instance of ```pretty-error```.  
 * .argv Returns an instance of ```minimist```.  
 * .color Returns an instance of ```chalk```.  
 * .config Returns an instance of ```user-appdata```.  
 * .Error Returns class of ```n-cli.Error```.
 */ 
var CLI = function(init) {
  if (init === undefined){
    throw new E("api-expect-config-argument");
  }
  /**
   * @member PrettyError prettyError Returns an instance of prettyError.
   */
  this.prettyError = new PrettyError();
  this.prettyError.skipNodeFiles();
  this.prettyError.skipPath("bootstrap_node.js");

  this.init = init || {};
  this.argv = minimist(this.init.argv || process.argv.slice(2));
  this.argv.notNull = argvNotNull.bind(this.argv);
  this.color = chalk;
  this.Error = E;
  this.minimist = minimist;


  if (init.handleUncaughtException === true){
    this.handleUncaughtException();
  }
  var basePath = path.dirname(module.parent.filename);
  this.packageJson = this.findup(basePath, "package.json");
  if (this.packageJson === null){
    throw new E("api-package-json-not-found", "tried " + basePath + " and parent folders.");
  }

  this.config = new Config({appname : this.packageJson.settings.name, defaultSettings : init.defaultSettings || {}})


  this.programInfo();

  return this;
}
 

 /**
  * Resolve a path
  * @method resolvePath
  * @param  {string}  fileOrDir  Filename or directory
  * @return {string}          Absolute directory name relative to the current working directory of process. 
  */
CLI.prototype.resolvePath = function(fileOrDir){
	var result = fileOrDir;
	if (!path.isAbsolute(fileOrDir)){
		result = path.resolve(path.join(process.cwd(), fileOrDir));
	}
	return result;
};

 /**
  * Find a file in parent directories.
  * @method findup
  * @param  {string}  basedir  In most cases the current directory of process.
  * @param  {string}  filename  Filename to find.
  * @return {string}          Absolute directory to given ```filename```. 
  */
CLI.prototype.findup = function(basedir, filename){
    var result = null;
    if ( fs.existsSync( path.join(basedir, filename ))) {
        result = {
            dir : basedir,
            filename : filename,
            fullpath : path.join(basedir, filename),
            settings : JSON.parse(fs.readFileSync(path.join(basedir, filename)))
        };
    } else {
        var newdir = path.join(basedir, "..");
        if (newdir !== basedir){
            result = this.findup(newdir, filename);
        }
    }

    return result ;
};

 /**
  * Output program informations based on ```package.json``` to console.
  * @method programInfo 
  */
CLI.prototype.programInfo = function(){ 
  this.stdout(this.color.white(this.packageJson.settings.name + " " + this.packageJson.settings.version) + " " + this.color.grey(this.packageJson.settings.license + " " + this.packageJson.settings.homepage) + "\n");
};

CLI.prototype.renderError = function(error){
  if (error.constructor.name === "NodeCliError"){
    this.stderr(chalk.bgRed.white.bold(error.message) + " " + chalk.white(error.description) || "");
  } else {
    var renderedError = this.prettyError.render(error);
    console.error(renderedError);
  }
};

CLI.prototype.handleUncaughtException = function () {
  process.on("uncaughtException", this.renderError.bind(this));
};

 /**
  * Catch a commandline switch case.
  * @method on
  * @param  {string}    [commandName]       A command you want to process. For example ```push``` or ```commit```.
  * @param  {function}  commandFunction   An event handler function.
  */
CLI.prototype.on = function (commandName, commandFunction) {
  if (typeof(commandName) === "function"){
    commandName.bind(this)();
  } else {
    if (this.argv._ && this.argv._[0] === commandName){
      if (typeof(commandFunction) !== "function"){
        throw new E("excepted-type-is-function", commandFunction);
      }
      commandFunction.bind(this)();
    }
  }
};

 /**
  * Determines of console app is running in silent mode. Silent mode activates automaticaly when ```process.env.NODE_ENV === "test"```.
  * @method silent 
  */
CLI.prototype.silent = function () {
  return (this.init.silent === undefined ? (process.env.NODE_ENV === "test") : this.init.silent);
};

/**
  * Like console.log put implements util.inspect.
  * @method log 
  */
CLI.prototype.log = function () {
  this.outputbuffer = null;
  if (!this.silent()) {
    var args = [];
    for(var i = 0; i < arguments.length; i++){
      args.push(util.inspect(arguments[i], /*showHidden=*/false, /*depth=*/this.init.inspectDepth || 4, /*colorize=*/true));
    }
    console.log.apply(console.log,  args );
  }
  this.outputbuffer = arguments;
  return this;
};

/**
  * Like console.error put implements util.inspect.
  * @method error 
  */
CLI.prototype.error = function () {
  this.outputbuffer = null;
  if (!this.silent()) {
    var args = [];
    for(var i = 0; i < arguments.length; i++){
      args.push(util.inspect(arguments[i], /*showHidden=*/false, /*depth=*/10, /*colorize=*/true));
    }
    console.error.apply(console.error,  args );
  }
  this.outputbuffer = arguments;
  return this;
};

/**
  * Wrapper for process.stdout.write
  * @method stdout 
  */
CLI.prototype.stdout = function () {
  this.outputbuffer = null;
  if (!this.silent()) {
    process.stdout.write(arguments[0]);
  }
  this.outputbuffer = arguments[0];
  return this;
};

/**
  * Wrapper for process.stderr.write
  * @method stderr 
  */
CLI.prototype.stderr = function () {
  this.outputbuffer = null;
  if (!this.silent()) {
    process.stderr.write(arguments[0]);
  }
  this.outputbuffer = arguments[0];
  return this;
};



module.exports = CLI;


/** 
 * @title n-cli
 * @overview Aims to solve most standard problems regarding console apps development 
 * @copyright (c) 2016 Stephan Ahlf
 * @license MIT
 * @author Stephan Ahlf
 */
 