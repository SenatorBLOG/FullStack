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

app.get('/api/bookinfo', async (req, res) => {
  try {
    // Example: fetch data from an external API
    const response = await axios.get("https://openlibrary.org/works/OL45883W.json");

    // Send back the data you want
    res.json({
      title: response.data.title,
      author: response.data.authors ? response.data.authors[0].name : "Unknown"
    });
  } catch (error) {
    console.error("Error fetching book info:", error.message);
    res.status(500).json({ error: "Failed to fetch book info" });
  }
});


//listen to the incoming requests
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`The server is up and listening on port ${port}`);
})
