import express from 'express'
import {Movie} from "../models/movies.js"

const router = express.Router();

//
router.get("/api/moviesinfo",async(req,res)=>{
    try{
        const movies = await Movie.find();
        res.status(200).json(movies);

    }catch(err){
        res.status(500).json({"error":err.message});
    }
})

router.get("/api/moviesinfo/:id",async(req,res)=>{
    const {id} = req.params;
    try{
        const movie = await Movie.findById(id);
        if(!movie){
            return res.status(404).json({"Error":"No such a movie"})
        }
        res.status(200).json(movie);

    }catch(err){
        res.status(500).json({"error":err.message});
    }
})

router.post("/api/addmovie",async(req,res)=>{
    const movie = req.body;
    const movieDoc = new Movie(movie);
    try{
        const savedMovie = await movieDoc.save();
        res.status(201).json(savedMovie);

    }catch(err){
        res.status(500).json({"error":err.message});
    }
})

router.put("/api/",async(req,res)=>{
    const {id} = req.params;
    const movie = req.body;
    try{
        const updateMovie = await Movie.findByIdAndUpdate(id,
        movie,{new:true, runValidator:true})
        if(!updateMovie){
            return res.status(404).json({"Error":"Couldnt update the movie"})
        }
        express.status(200).json(updateMovie);

    }catch(err){
        res.status(500).json({"error":err.message});
    }
})

//DELETE 


router.delete("/api/deletemovie/:id",async(req,res)=>{
    const {id} = req.params;
    try{
        const result = await Movie.deleteOne({_id:id});
        if(result.deletedCount){
            return res.status(404).json({"error":"Couldnt delete the movie"})

        }
        res.status(200).json({"message":"Successfully deleted"})

    }catch(err){
        res.status(500).json({"error":err.message});
    }
})

export default router;