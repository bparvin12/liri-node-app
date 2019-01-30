console.log('this is loaded');

//spotify
var spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

//omdb
var omdbAPI = {
  key: "5979aa29",
};

var concertKey = "codingbootcamp"

module.exports = {
  spotifyID: spotify.id,
  spotifySecret: spotify.secret,
  omdbAPI: omdbAPI.key,
  concertKey: concertKey
};
