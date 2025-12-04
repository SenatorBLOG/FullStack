import mongoose from "mongoose";
import { uri } from "../atlas_uri.js";

export const connectDB = async ()=>{
    try{
        await mongoose.connect(uri);
        console.log(`Connected to MongoDB`);
    }
    catch(err){
        console.log(`ERROR in connectiong to MongoDB: ${err.message}`);
        process.exit(1);
    }
}