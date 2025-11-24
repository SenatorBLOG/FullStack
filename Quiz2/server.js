// server.js
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Recreate __filename and __dirname
const __filename = fileURLtoPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.render('index')
});

try{
    const user = (req.body.searchUser || '').trim();
    const url = `https://jsonplaceholder.typicode.com/users/${selectedUserId}`

    const response = await fetch(url);
    const results = (await response.json().results ||[]);
    const users = results.map(user => {
        name:user.name // and so on
        
    })

    res.render('index',{name,email,address,phone});
}
catch(err){
    console.error('Server error:',err?.response?.data || err.message ||err);
}



app.listen(3000, () => {
  console.log("Listening on port 3000");
});
