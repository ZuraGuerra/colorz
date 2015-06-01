/**
 * TweetsController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'lWeAbrsax9K26WDiDV17OA',
  consumer_secret: 'GBAw5o6JCmn6CjQHIqpDTDPGDMNnFIj4NPdoVaxzJI',
  access_token_key: '14245496-up5Dfprhez24u0MSbYiAD5jIquTrvxVHg4MYMgvpc',
  access_token_secret: '7SOba8Rh80wv0fkEWD2yTRjVQi0ckqSsqlvOiX49icdma'
});


// Subscribe and get new tweets, stream them via websockets.
var stream_params = {track: 'bot2bot'}
var current_stream = null;

function twitterSubscribe() {
  client.stream('statuses/filter', stream_params,  function(stream){

    console.log("Subscribed with params ", stream_params);
    current_stream = stream;

    stream.on('data', function(tweet) {
      console.log('Got new tweet', tweet);
      // Send this new tweet to the browser via websockets, on event 'new_tweet'
      sails.sockets.blast('new_tweet', tweet);
    });

    stream.on('error', function(error) {
      console.log(error);
    });

  });

}

function twitterUnsubscribe() {
  if (current_stream != null) {
    current_stream.destroy();
  }
}

twitterSubscribe();


module.exports = {
  setHashtag: function (req, res) {
    twitterUnsubscribe();

    stream_params.track = 'zura';
    twitterSubscribe();

    res.json(stream_params);
  },

	list: function (req, res) {
    var params = {screen_name: 'allgomx', count: 200};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
      if (!error) {
        res.json(tweets);
      }
    });
  }
};

