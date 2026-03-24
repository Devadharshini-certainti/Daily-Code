// const express = require('express');
// const app=express();
// const user={
//     email:"deva@gmail.com",
//     password:"deva123"
// }
// app.use(express.json());
// app.post('/login',(req,res)=>{
//     const {email,password}=req.body;
//     if(email===user.email && password===user.password){
//         res.status(200).json({message:"Login successful"});
//     }else{
//         res.status(401).json({message:"Invalid email or password"});
//     }       
// });

const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

const API_KEY = "37f50264";

app.get("/movie", async (req, res) => {
  const movieName = req.query.name;

  if (!movieName) {
    return res.json({ message: "Movie name is required" });
  }

  try {
    const url = `http://www.omdbapi.com/?t=${movieName}&apikey=${API_KEY}`;

    const response = await axios.get(url);
    const data = response.data;

    if (data.Response === "False") {
      return res.json({ message: "Movie not found" });
    }

    res.json({
      title: data.Title,
      year: data.Year,
      rating: data.imdbRating,
      genre: data.Genre,
      plot: data.Plot
    });

  } catch (error) {
    console.log(error.message); 
    res.json({ message: "Error fetching movie data" });
  }
});

app.listen(PORT, () => {
  console.log("Server starting");
  console.log(`Server running at http://localhost:${PORT}`);
});