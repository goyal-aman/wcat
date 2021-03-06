let fs = require("fs");

function removeLargeSpaces(arr){
    // remove consecutive occurance of item in arr
    let singleSpacedArr = [arr[0]];
    for(let x=1;x<arr.length; x++){
        if( (arr[x]!="" || arr[x-1]!="" ) 
        && (arr[x]!="\r" || arr[x-1]!="\r" )){
            singleSpacedArr.push(arr[x])
        }
    }
    return singleSpacedArr
}
function addNum(arr){
    // -n | adds line number at the beggining of each line
    let count = 1;
    for(let item in arr){
        arr[item] =  count+" "+ arr[item];
        count+=1;
    }
    return arr;
}

function addNumNonSpace(arr){
    // -b | add line number at the beggining of each line for non
    // empty strings.
    let count = 1;
    for(let item in arr){
        if(arr[item]!="" && arr[item]!="\r"){
            arr[item] = count +" "+arr[item];
            count+=1;
        }
    }
    return arr;
}

let cmd = process.argv.slice(2);
(function (){
    let options = [];
    let files = [];
    let str = "";
    
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


    // reading all the files in string format, and concatinating
    // it to `str`
    for(let fileIndex in files){
        str += fs.readFileSync(files[fileIndex]).toString();
    }
    // convertng `str` to array of new lines

    strArr = str.split("\n");

    // if there is `-s` then it would mean we want to remove consecutive
    // non-desired characters.
    // console.log(strArr);
    if(options.includes("-s")){
        strArr = removeLargeSpaces(strArr);
    }

    if(options.includes("-b") && options.includes("-n")){
        // if user gives  both`-b` and `-n` 
        // `-n` -> add numbers to all lines.
        // `-b` -> add numbers to non empty lines.
        // `-n` && `-b` are mutually exclusive
        // in that case only execute command which came first.
        if(options.indexOf("-n")>options.indexOf("-b")){
            strArr = addNumNonSpace(strArr);
        } else{
            strArr = addNum(strArr);
        }
    }
    else if(options.includes("-b")){
        // if user only gives -b
        strArr = addNumNonSpace(strArr);
    }else if(options.includes("-n")){
        // if user only gives -n
        strArr = addNum(strArr);
    }
    // console.log("here");
    // console.log(strArr);
    str = strArr.join("\n")
    console.log(str);
})();
