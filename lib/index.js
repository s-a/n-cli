"use strict";

var minimist = require("minimist");
var E = require("./error.js");
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


var CLI = function(init) {  
  if (init === undefined){
    throw new E("api-expect-config-argument");
  }
  this.prettyError = new PrettyError();
  this.prettyError.skipNodeFiles();
  this.prettyError.skipPath("bootstrap_node.js");
  if (!init.appname){
    throw new E("api-expect-config-argument", "appname");
  }
  this.init = init || {};
  this.argv = minimist(this.init.argv || process.argv.slice(2));
  this.argv.notNull = argvNotNull.bind(this.argv);
  this.config = new Config({appname : init.appname, defaultSettings : init.defaultSettings || {}})
  this.color = chalk;
  this.Error = E;
  this.minimist = minimist; 

  if (init.handleUncaughtException === true){ 
    this.handleUncaughtException(); 
  }

  return this;
}

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

CLI.prototype.on = function (commandName, commandFunction) {
  if (this.argv._ && this.argv._[0] === commandName){
    if (typeof(commandFunction) !== "function"){
      throw new E("excepted-type-is-function", commandFunction);
    }
    commandFunction.bind(this)();
  }/* else {
    throw new E("command-not-found", commandName);
  }*/
}; 

CLI.prototype.silent = function () {
  return (this.init.silent === undefined ? (process.env.NODE_ENV === "test") : this.init.silent); 
};

CLI.prototype.log = function () {
  this.outputbuffer = null;
  if (!this.silent()) {
    var args = [];
    for(var i = 0; i < arguments.length; i++){
      args.push(util.inspect(arguments[i], /*showHidden=*/false, /*depth=*/10, /*colorize=*/true));
    }
    console.log.apply(console.log,  args );
  }
  this.outputbuffer = arguments;
  return this;
};

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

CLI.prototype.stdout = function () {
  this.outputbuffer = null;
  if (!this.silent()) {
    process.stdout.write(arguments[0]);
  }
  this.outputbuffer = arguments[0];
  return this;
};

CLI.prototype.stderr = function () {
  this.outputbuffer = null;
  if (!this.silent()) {
    process.stderr.write(arguments[0]);
  }
  this.outputbuffer = arguments[0];
  return this;
};



module.exports = CLI;

