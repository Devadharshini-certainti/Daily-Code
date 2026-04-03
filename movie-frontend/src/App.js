import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [movieName, setMovieName] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!movieName.trim()) {
      setError("Please enter a movie name");
      setMovie(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMovie(null);

      const response = await axios.get(
        `http://localhost:5000/movie?name=${movieName}`
      );

      if (response.data.message) {
        setError(response.data.message);
      } else {
        setMovie(response.data);
      }
    } catch (err) {
      setError("Error fetching movie data");
      setMovie(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Movie Search App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter movie name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {movie && (
        <div className="movie-card">
          {movie.poster && movie.poster !== "N/A" && (
            <img src={movie.poster} alt={movie.title} />
          )}

          <div className="movie-details">
            <h2>{movie.title}</h2>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Plot:</strong> {movie.plot}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;