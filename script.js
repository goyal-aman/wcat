let fs = require("fs");

let cmd = process.argv.slice(2);
(function (){
    let options = [];
    let files = [];
    
    for(let x in cmd){
        if(cmd[x].length==2 && cmd[x].startsWith("-")){
            options.push(cmd[x]);
        }else{
            files.push(cmd[x]);
        }
    }
    for(let fileIndex in files){
        if(!fs.existsSync(files[fileIndex])){
            console.log(files[fileIndex]+" doesn't exist.");
            return;
        }
    }
    console.log(options);
    console.log(files);
})();
