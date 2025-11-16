import express from "express";

const router = express.Router();

//get reuest routes

router.get("/", (req,res)=>{
    // console.log(req.rawHeaders);
    // console.log(req.headers["user-agent"])
    res.send("Hello!!")
})
router.get("/about", (req,res)=>{
    res.json({"name":"Anu"})
})
router.get("/contact", (req,res)=>{
    res.send("<h1>Email: anu@gmail.com</h1>")
})

//POST
router.post("/register",(req,res)=>{
    res.sendStatus(201);
})
//PUT
router.put("/login",(req,res)=>{
    res.sendStatus(200);
})
//PATCH
router.patch("/login",(req,res)=>{
    res.sendStatus(200)
})
//DELETE
router.delete("/login",(req,res)=>{
    res.sendStatus(200)
})


export default router