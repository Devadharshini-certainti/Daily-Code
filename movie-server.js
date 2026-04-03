const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;
const API_KEY = "37f50264";

app.get("/movie", async (req, res) => {
  const movieName = req.query.name;

  if (!movieName || !movieName.trim()) {
    return res.json({ message: "Movie name is required" });
  }

  try {
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(
      movieName
    )}&apikey=${API_KEY}`;

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
      plot: data.Plot,
      poster: data.Poster
    });
  } catch (error) {
    console.log(error.message);
    res.json({ message: "Error fetching movie data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});