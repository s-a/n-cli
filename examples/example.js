#!/usr/bin/env node

"use strict";

function MyCommandLineApp(argv){
    this.argv = argv || process.argv.slice(2);
    return this;
}

MyCommandLineApp.prototype.start = function(){
    var CLI = require("../lib"); 
    var cli = new CLI({ 
        handleUncaughtException : true,
        argv : this.argv 
    });
    
    cli.on("yolo", function(){
        this.argv.notNull("test");
        this.log(this.argv);
    });

    cli.on("unicorn", function(){
        this.argv.notNull("rainbow");
        this.log("this");
    }); 
};

if (require.main === module) {
    new MyCommandLineApp().start(); 
} else {
    module.exports = MyCommandLineApp;
} 