import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import router from "./routes/booksRoutes.js";

//create the app
const app = express();

//mount the middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

//connect to the DB
connectDB();

//use the routes
app.use("/", router)

//listen to the incoming requests
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`The server is up and listening on port ${port}`);
})
