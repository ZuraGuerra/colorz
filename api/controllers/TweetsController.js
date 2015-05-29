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

module.exports = {

	list: function (req, res) {

    var params = {screen_name: 'allgomx'};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
      if (!error) {
        res.json(tweets);
      }
    });


    /*var params = {q: 'bot2bot'};
    client.get('search/tweets', params, function(error, tweets, response){
      if (!error) {
        res.json(tweets);
      }
    });*/

  

    /*client.stream('statuses/filter', {track: 'bot2bot'},  function(stream){
      stream.on('data', function(tweet) {
        console.log(tweets.text);
        res.json(tweets);
      });

      stream.on('error', function(error) {
        console.log(error);
      });
    });*/

  }
};

