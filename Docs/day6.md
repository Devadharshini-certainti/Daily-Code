## DAY6-MOVIESEARH API INTEGRATION
The OMDb API (Open Movie Database API) is an online web service providing programmatic access to film and television metadata. It enables developers to retrieve information such as titles, cast, release dates, ratings, and posters from a crowd-sourced database modeled after major public movie repositories. Its simplicity and free-tier access make it a popular resource for media applications and research.

## Backend Code Summary
A server is created using Express.js

A request is sent to:

/movie?name=avatar
The movie name is extracted from query parameters
The server calls the OMDb API using Axios
Movie data is fetched from the external API
Required fields (title, year, rating, genre, plot) are selected
A structured JSON response is returned to the client

## 🔄 Flow

Client → Backend → OMDb API → Backend → Client

##  PLATFORM API HAS CREATED

https://www.omdbapi.com/apikey.aspx