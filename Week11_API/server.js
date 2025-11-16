import express from "express"
import axios from "axios"
import path from "path"
import { fileURLToPath } from "url";
import { diff } from "util";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const app = express();
//set up the middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(express.static("public"));

//set up view engine and the path to the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

//SET UP THE GET ROUTE

app.get("/", async (req,res)=>{
    // res.send("Hello");
    try{
        const url = `https://catfact.ninja/facts`;
        //make a get request to the external server using axios
        /* const response = await axios.get(url);
        const data = response.data; */
        const {data, status} = await axios.get(url);
        const facts = data.data;
        const randIndex = Math.floor(Math.random()*facts.length);
        const fact = facts[randIndex]

        // res.render("index_simple.ejs", {name:"Anu"})
        res.render("index.ejs", {data:fact})
        // console.log(data);
    }
    catch(err){
        //  console.log(`The error is ${err.message}`)
        res.render("index.ejs",{error:err.message})
    }
})


app.post("/", async (req,res)=>{
    const {category, difficulty} = req.body;
    // console.log(category, difficulty)
    try{
        const url = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=boolean`
        const response = await fetch(url);
        const data = await response.json();
        const obj = data.results[0];
        res.render("index.ejs", {data:obj})
    }
    catch(err){
        res.render("index.ejs", {error:err.message})
    }
})









//make the server listen to the requests at port 3000
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`The server is up and running on port ${PORT}`);
})