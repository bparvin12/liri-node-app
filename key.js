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

module.exports = {
  spotify: spotify,
  omdbAPI: omdbAPI.key,
};
