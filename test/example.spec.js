"use strict";

process.env.NODE_ENV = "test";

var CLI = require("../lib");
var should = require("should");
var CommandLineApp = require("./../examples/example.js");


describe("example commandLineApp", function () {

  it("should start", function () { 
      var commandLineApp = new CommandLineApp(); 
      commandLineApp.start();
  });
  

  it("should throw missing-parameter", function () {
    should(function(){
      var commandLineApp = new CommandLineApp(["unicorn"]); 
      commandLineApp.start();
    }).throw("missing-parameter");
  });
  

  it("should throw missing-parameter-value", function () {
    should(function(){
      var commandLineApp = new CommandLineApp(["unicorn", "--rainbow"]); 
      commandLineApp.start();
    }).throw("missing-parameter-value");
  });
  

  it("should run unicorn fine", function () {
    var commandLineApp = new CommandLineApp(["unicorn", "--rainbow", "1a"]); 
    commandLineApp.start(); 
  });
  

  it("should run yolo fine", function () {
    var commandLineApp = new CommandLineApp(["yolo", "--test", "1a"]); 
    commandLineApp.start(); 
  });
  

});
