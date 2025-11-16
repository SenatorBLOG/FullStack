// console.log("Hello from Node");
import fs from "fs";

fs.copyFileSync("source.txt", "dest.txt");
console.log("file copied synchronously");

fs.copyFile("source.txt", "dest.txt", (err)=>{
    if (err) throw err;
    console.log("file copied successfully")
})
console.log("Both finished");