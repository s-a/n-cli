"use strict";

var chalk = require("chalk");

function NodeCliError(name, message) {
  this.message = name;
  this.description = (message || "");
  return this;
}

NodeCliError.prototype.log = function (output) {
  if (output) {
    output(this.message, this.desciption);
  } else {
    console.error(chalk.bgRed.white.bold(this.message), chalk.white(this.desciption));
  }
};

module.exports = NodeCliError;
