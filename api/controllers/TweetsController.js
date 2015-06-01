/**
 * TweetsController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'D13OLdWHqIuT3dPZsXoDqt3kB',
  consumer_secret: 'xiUaC3Fovk3irENCwU6raN8iCNLubfvY1K9D4w3X2jMEep9Uwh',
  access_token_key: '14245496-32efssRk4lnrqjm30zVUjosZrDiLcP3nP7vAdjVRa',
  access_token_secret: 'MovZudSKwA7zJ436OvloI4ydxNeply6w8FveFBUGpmAFW'
});


// Subscribe and get new tweets, stream them via websockets.
client.stream('statuses/filter', {track: 'twitter'},  function(stream){
  stream.on('data', function(tweet) {
    console.log('Got new tweet', tweet);
    // Send this new tweet to the browser via websockets, on event 'new_tweet'
    sails.sockets.blast('new_tweet', tweet);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});


module.exports = {
	list: function (req, res) {
    var params = {screen_name: 'allgomx', count: 200};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
      if (!error) {
        res.json(tweets);
      }
    });
  }
};

