import express from "express";
import router from "./routes/basicRoutes.js";

//create an application
const app = express();

app.use("/", router);

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`The server is up and it is running on PORT ${PORT}`);
});