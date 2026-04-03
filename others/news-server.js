const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 5000;

const API_KEY = "aee468152be7483bb83edcd7b1472ec3";

app.get("/news", async (req, res) => {
  const topic = req.query.topic;

  if (!topic) {
    return res.json({ message: "Topic is required" });
  }

  try {
    const url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${API_KEY}`;

    const response = await axios.get(url);
    const data = response.data;

    res.json(data.articles);

  } catch (error) {
    console.log(error.message);
    res.json({ message: "Error fetching news" });
  }
});

app.listen(PORT, () => {
    console.log("NEWS SERVER STARTED");
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});