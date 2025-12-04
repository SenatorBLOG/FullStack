import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please check your entry, no title specified."],
  },
  director: {
    type: String,
    required: [true, "Please check your entry, no director specified."],
  },
  numberInStock: {
    type: Number,
    required: [true, "Number in Stock is missing. Please provide a value."],
  },
  price: Number,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [
      true,
      "The rating is required, please specify a value between 1-5.",
    ],
  },
  releaseDate: {
    type: Date,
    default: Date.now, // No parentheses to ensure execution at creation time
  },
  like: Boolean,
  img: {
    type: String,
    default: "test.jpg",
  },
});

export const Movie = mongoose.model("Movie", movieSchema);
