
var CLI = require("../lib");
var cli = new CLI({
    appname: "node-cli-example-app-1",
    handleUncaughtException : true
});
 
cli.on("yolo", function(){
    this.argv.notNull("test");
    this.log(this.argv);
});

cli.on("unicorn", function(){
    this.argv.notNull("rainbow");
    this.log("this");
});
