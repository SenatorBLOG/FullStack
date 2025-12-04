import express from "express";
import { Movie } from "../models/movies.js";

const router = express.Router();

//GET ALL
router.get("/api/moviesinfo", async(req,res)=>{
    try{
        const movies = await Movie.find(); //READ
        res.status(200).json(movies);
    }
    catch(err){
        res.status(500).json({"error":err.message}); //500 is the internal server error code
    }
})

//GET ONE
router.get("/api/moviesinfo/:id", async(req,res)=>{
    const {id} = req.params;
    try{
        const movie = await Movie.findById(id); //READ
        if(!movie){
            return res.status(404).json({"error":"No such movie exists"})
        }
        res.status(200).json(movie);
    }
    catch(err){
        res.status(500).json({"error":err.message});
    }
})


//POST
router.post("/api/addmovie", async(req,res)=>{
    const movie = req.body;
    const movieDoc = new Movie(movie);
    try{
        const savedMovie = await movieDoc.save();
        res.status(201).json(savedMovie);
      
    }
    catch(err){
        res.status(500).json({"error":err.message});
    }
})

//PUT
router.put("/api/updatemovie/:id", async(req,res)=>{
    const {id} = req.params;
    const movie = req.body;

    try{
    const updatedMovie = await Movie.findByIdAndUpdate(id,movie,{new:true, runValidators:true})

    if(!updatedMovie){
        return res.status(404).json({"error":"Could not update the movie"})
    }
    res.status(200).json(updatedMovie);
    }
    catch(err){
        res.status(500).json({"error":err.message});
    }
})

//DELETE

router.delete("/api/deletemovie/:id", async(req,res)=>{
    const {id} = req.params;
    try{
        const result = await Movie.deleteOne({_id:id});
        if(result.deletedCount===0){
            return res.status(404).json({"error":"Could not delete the movie"}) 
        }
        res.status(200).json({"message":"Successfully deleted the movie."})

    } 
    catch(err){
        res.status(500).json({"error":err.message});
    }
})



export default router;