
//node modules and packages needed to require 
var dotenv = require('dotenv').config();
var fs = require("fs");
var keys = require("./key.js");
var moment = require('moment');
var bandsintown = require('bandsintown')(keys.concertKey);
var Spotify = require("node-spotify-api");
var request = require("request");

var liriArgument = process.argv[2]
var argument3 = process.argv[3];

//=======================================================================================================

//possible command lines 
//sends the liriargument hich is process.argv[2]
switch (liriArgument) {
    //sending argument 3 which is process.argv[3] to all functions
    case "concert-this": concertThis(argument3);
        break;
    case "spotify-this-song": spotifyThisSong(argument3);
        break;
    case "movie-this": movieThis(argument3);
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
    var movie = process.argv[3]
    //show default movie
    if (!movie) {
        movie = "Harry Potter and the Goblet of Fire";
    }

    var omdbURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + keys.omdbAPI;
    // console.log(omdbURL);

    request(omdbURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var movieResults =
                "---------------------------------------------------\n" +
                "Movie Tile: " + JSON.parse(body).Title + "\n" +
                "IMDB Rating: " + JSON.parse(body).imdbRating + "\n" +
                "Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value + "\n" +
                "Country where the movie was produced: " + JSON.parse(body).Country + "\n" +
                "Plot: " + JSON.parse(body).Plot + "\n" +
                "Actors: " + JSON.parse(body).Actors + "\n" +
                "---------------------------------------------------";
            console.log(movieResults)
            log(movieResults);
        } else {
            console.log("Error :" + error);
            return;
        };
    });
};


//function for spotify
function spotifyThisSong(a) {
    var song = a;
    //api key
    var spotify = new Spotify({
        id: keys.spotifyID,
        secret: keys.spotifySecret,
    });
    //default song if none is selected
    if (!song) {
        song = "All of Me";
    }
    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            var spotifyResults = 
            "------------------------------------------------\n" +
            "Song Name: " + response.tracks.items[0].name + 
            "\nArtist(s): " + response.tracks.items[0].artists[0].name + 
            "\nAlbum the song is from: " + response.tracks.items[0].album.name + 
            "\nPreview link to the song: " + response.tracks.items[0].preview_url +
            "\n-------------------------------------------------";
            console.log(spotifyResults)
            log(spotifyResults);
        })
        .catch(function (err) {
            console.log(err);
        });
};

//concert this
function concertThis() {
    var concert = process.argv[3]
    //show default movie
    if (!concert) {
        concert = "Beyonce";
    }

    var concertURL = "https://rest.bandsintown.com/artists/" + concert + "/events?app_id=" + keys.concertKey + "&date=upcoming";
    request(concertURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(JSON.parse(body));
        } else {
            console.log("Error :" + error);
            return;
        };
    });
}

//do what it says function
function doWhatItSays() {
    fs.readFile("./random.txt", "utf8", function (error, data) {
        if (!error) {
            var dataResults = data.split(",");
            console.log(dataResults[0]);
            console.log(dataResults[1]);
            liriArgument = dataResults[0];
            argument3 = dataResults[1];
            spotifyThisSong(argument3)

        } else {
            console.log("Error :" + error);
            return;
        }

    });
}

//log function to log.txt
function log(logResults) {
    fs.appendFile("log.txt", logResults, (error) => {
        if (error) {
            throw error;
        }
    })
}


