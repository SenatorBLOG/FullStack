import express from "express";
import cors from "cors";
import {connectDB} from './config/db.js';
import router from "./routes/basicRoutes.js";

//1. create the app
const app = express();

//2. mount the middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

//3. conenct to the database
connectDB();

//4. use the routes
app.use("/",router)

//5. listen to the incoming requests
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`The server is up and listening on port ${port}`)
})