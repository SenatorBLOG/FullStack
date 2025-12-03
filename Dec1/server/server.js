import express from 'express';
import cors from 'cors';
import router from './routes/basicROutes.js'

import {connectDB} from './config/db.js'

//`.creatre ther app
const app = express();
//2.mount 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

connectDB();

//4. use the routes
app.use("/", router)

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`The server is up and runiini on the port ${port}`)
});
