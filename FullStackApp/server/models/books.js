import mongoose from "mongoose";

//1. create a schema
//schema is a blueprint or structure of our data that we are going to save into our MongoDB database
//This bookSchema lays down the foundation for every new book that will be added to our database.
//Performing Validations while defining the schema

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please check your entry, no title specified."],
  },
  author: {
    type: String,
    required: [true, "Please check your entry, no author specified."],
  },
  numberInStock: {
    type: Number,
    required: [true, "Number in Stock is missing. Please provide a value."],
  },
  price: Number,
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [
      true,
      "The rating is required, please specify a value between 1-100.",
    ],
  },
  publishYear: {
    type: Date,
    default: Date.now, // No parentheses to ensure execution at creation time
  },
  like: Boolean,
});

//2. Compiling our schema into a Model (create a model based on the schema)
//use the schema to create a mongoose model - specify two parameters
//first - is the string (model name) that Mongoose uses internally to register the model and link to the MongoDB collection "books" (pluralized)

//If you have a collection of books, you use the word Book in singular form
//and Mongoose will convert this string to a plural form to create (or link to ) your collection.

//second - is the schema you defined that specifies the structure of documents in this collection (fields, types, validations, etc.).

//A model is a class with which we construct documents.

export const Book = mongoose.model("Book", bookSchema);
