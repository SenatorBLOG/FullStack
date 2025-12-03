import mongoose from "mongoose";
import {url} from "../atlas_url.js";

export const connectDB = async ()=>{
    try{
        await mongoose.connect(url)
        console.log("Connected to MongoDB")
    }
    catch(err){
        console.log(`ERROR in connection to mongo DB: ${err.message}`);
        process.exit(1);
    }
}