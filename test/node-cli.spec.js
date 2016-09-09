"use strict";

process.env.NODE_ENV = "test";

var CLI = require("../lib");
var should = require("should");
var NodeCliError = require("./../lib/error.js");
var appname = "node-cli-test-spec";

describe("node command line interface", function () {

  it("should throw api-expect-config-argument", function () {
    should(function(){
      var cli = new CLI();
      cli.on("ls", "doh!");
    }).throw("api-expect-config-argument");
  });
 

/*  it("should throw command-not-found", function () {
    should(function(){
      var cli = new CLI({appname: appname, argv: ["ls"]});
      cli.on("dir", emptyFunction);
    }).throw("command-not-found");
  });
*/
  it("should throw excepted-type-is-function", function () {
    should(function(){
      var cli = new CLI({appname: appname, argv: ["ls"]});
      cli.on("ls", "doh!");
    }).throw("excepted-type-is-function");
  });

  it("should run a program", function (done) {
    var cli = new CLI({appname: appname, argv: ["dir", "--test", "5"]});
    cli.on("dir", function(){
      cli.argv.notNull("test");
      done();
    });
  });

  it("should throw missing-parameter", function () {
    var cli = new CLI({appname: appname, argv: ["dir"]});
    should(function(){
      cli.argv.notNull("test");
    }).throw("missing-parameter");
  });

  it("should throw missing-parameter-value", function () {
    var cli = new CLI({appname: appname, argv: ["dir", "--test"]});
    should(function(){
      cli.argv.notNull("test");
    }).throw("missing-parameter-value");
  });

  it("should identify test environment", function () {
    var cli = new CLI({appname: appname, argv: ["dir"]});
    cli.silent(true).should.equal(true);
    cli.silent().should.equal(true);
  });

  it("should stdout text to console", function () {
    var cli = new CLI({silent:false, appname: appname, argv: ["dir"]});
    cli.silent(false);
    cli.stdout("cool?").outputbuffer.should.equal("cool?");
  });

  it("should stderr text to console", function () {
    var cli = new CLI({silent:false, appname: appname, argv: ["dir"]});
    cli.silent(false);
    cli.stderr("err?").outputbuffer.should.equal("err?");
  });

  it("should log grummel? to console", function () {
    var cli = new CLI({silent:false, appname: appname, argv: ["dir"]});
    cli.log({text:"grummel?"}).outputbuffer[0].should.deepEqual({text: "grummel?"});
  });

  it("should log done? to console", function () {
    var cli = new CLI({silent:false, appname: appname, argv: ["dir"]});
    cli.log({text:"done?"}).outputbuffer[0].should.deepEqual({text: "done?"});
  });

  it("should throw yolo-test-error", function () {
    var cli = new CLI({handleUncaughtException:true, silent:false, appname: appname, argv: ["dir"]});
    try {
      throw new NodeCliError("yolo-test-error", "!doh");
    } catch (err) {
      if (err instanceof NodeCliError) {
        err.log();
        err.log(cli.error.bind(cli));
        cli.renderError(err)
      }
    }
  });

  it("should throw defaul-js-error", function () {
    var cli = new CLI({handleUncaughtException:true, silent:false, appname: appname, argv: ["dir"]});
    try {
      throw new Error("defaul-js-error", "!doh");
    } catch (err) {
      cli.renderError(err)
    }
  });
/*
  it("should throw yolo-test-2-error", function () {
    var cli = new CLI({handleUncaughtException:true, silent:false, appname: appname, argv: ["dir"]});

    throw new NodeCliError("yolo-test-2-error", "!doh");

  });*/

});
