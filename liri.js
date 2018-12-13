
//node modules and packages needed to require 
var fs = require("fs");
var dotenv = require('dotenv').config();
var moment = require('moment');
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./key.js");
var liriArgument = process.argv[2]

//=======================================================================================================

//possible command lines 
switch (liriArgument) {
    case "concert-this": concertThis();
        break;
    case "spotify-this-song": spotifyThisSong();
        break;
    case "movie-this": movieThis();
        break;
    case "do-what-it-says": doWhatItSays();
        break;
    //we need a default to instruct user
    default: console.log("\nBegin by typing one of the following commands after 'node liri.js' : \n" +
        "1. concert-this 'any artist' \n" +
        "2. spotify-this-song 'any song name' \n" +
        "3. movie-this 'any movie name' \n" +
        "4. do-what-it-says. \n"
    );
};

//=======================================================================================================
//Functions 
//movie function with omdb
function movieThis() {
    var movie = process.argv[3].replace(/ /g, "+")
    //show default movie
    if (!movie) {
        movie = "Harry Potter and the Goblet of Fire";
    }

    var omdbURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + keys.omdbAPI;
    console.log(omdbURL);

    request(omdbURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(
                "Movie Tile: " + JSON.parse(body).Title + "\n" +
                "IMDB Rating: " + JSON.parse(body).imdbRating + "\n" +
                "Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value + "\n" +
                "Country where the movie was produced: " + JSON.parse(body).Country + "\n" +
                "Plot: " + JSON.parse(body).Plot + "\n" +
                "Actors: " + JSON.parse(body).Actors + "\n"
            );
        } else {
            console.log("Error :" + error);
            return;
        };
    });
};


//function for spotify
function spotifyThisSong() {
    var song = process.argv[3];
    //api key
    var spotify = new Spotify({
        id: "cfcb4580abf747caa1e336a08a07e692",
        secret: "8667fbd89272416c9cebf95261825060",
    });
    //default song if none is selected
    if (!song) {
        song = "All of Me";
    }
    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            console.log("Song Name: " + response.tracks.items[0].name);
            console.log("Artist(s): " + response.tracks.items[0].artists[0].name);
            console.log("Album the song is from: " + response.tracks.items[0].album.name);
            console.log("Preview link to the song: " + response.tracks.items[0].preview_url);
        })
        .catch(function (err) {
            console.log(err);
        });
};

//do what it says function
function doWhatItSays() {
    fs.readFile("./random.txt", "utf8", function(error, data) {
        if (!error) {
            var dataResults = data.split(",");
        } else {
            console.log("Error :" + error);
            return;
        }
       
    });
}


