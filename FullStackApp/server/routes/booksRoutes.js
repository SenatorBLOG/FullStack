import express from "express";
import {Book} from "../models/books.js"
const router = express.Router();

router
.get("/api/booksinfo", async (req, res) => {
    try{
        const books = await Book.find(); //perform READ
        res.json(books)
    }
    catch(err){
        res.status(500).json({"error":err.message}); //500 status code -->internal server error
    }
})
router
.get("/api/booksinfo/:id", async(req, res)=> {
    // console.log(req.params);
    const {id} = req.params;
      try{
        const book = await Book.findById(id); //READ
        if(!book){
            return res.status(404).json({"error":"No such book exists"})
        }
        res.json(book);
    }
    catch(err){
        res.status(500).json({"error":err.message}); //500 status code -->internal server error
    }

})
router
.post("/api/addbook", async (req, res) => {
    try{
        const book = new Book(req.body);
        const savedDoc = await book.save(); //perform CREATE
        res.status(201).json(savedDoc)
    }
     catch(err){
        res.status(500).json({"error":err.message}); //500 status code -->internal server error
    }
})
router
.put("/api/updatebook/:id", async (req, res) => {
        const {id} = req.params
       try{
        const updatedBook = await Book.findByIdAndUpdate(id, req.body,{new:true,runValidators:true})
        if(!updatedBook){
            return res.status(404).json({"error":"Could not update the book"})
        }
        res.json(updatedBook)
    }
     catch(err){
        res.status(500).json({"error":err.message}); //500 status code -->internal server error
    }
})
router
.delete("/api/deletebook/:id", async (req, res) => {
    const {id} = req.params;
    try{
        const result = await Book.deleteOne({_id:id});
        if(result.deletedCount==0){
           return res.status(404).json({"error":"No matching document found. nothing was deleted"})
        }
        res.status(200).json({"message":`Successfully deleted ${result.deletedCount} document`})
    }
    catch(err){
        res.status(500).json({"error":err.message}); //500 status code -->internal server error
    }
})

export default router;