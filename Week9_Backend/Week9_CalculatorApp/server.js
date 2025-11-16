import express from "express";
import router from "./routes/basicRoutes.js";
const app = express();

//mount the middleware
app.use(express.urlencoded({extended:true}))

//prefix the router at /calculator
app.use("/calculator", router)



const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`The server is up and running on port ${PORT}`);
})