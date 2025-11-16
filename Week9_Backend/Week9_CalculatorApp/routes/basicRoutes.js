import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const router=express.Router();

//GET
router.get("/", (req,res)=>{
    // console.log(__dirname);
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

//POST
router.post("/",(req,res)=>{
    // console.log(req.body);
    let {num1,num2} = req.body;

    let ans = parseInt(num1) + parseInt(num2);
    res.send(`<h6>The answer is ${ans} </h6> `)
})
export default router;