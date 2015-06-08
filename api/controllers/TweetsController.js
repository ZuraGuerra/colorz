/**
 * TweetsController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

//  NODE MODULE: https://www.npmjs.com/package/twitter

var Twitter = require('twitter');
 
// CREDENTIALS

var client = new Twitter({
  consumer_key: 'lWeAbrsax9K26WDiDV17OA',
  consumer_secret: 'GBAw5o6JCmn6CjQHIqpDTDPGDMNnFIj4NPdoVaxzJI',
  access_token_key: '14245496-up5Dfprhez24u0MSbYiAD5jIquTrvxVHg4MYMgvpc',
  access_token_secret: '7SOba8Rh80wv0fkEWD2yTRjVQi0ckqSsqlvOiX49icdma'
});


// SUBSCRIPTION TO THE STREAM API VIA WEBSOCKETS

var stream_params = {track: 'browserdiscrimination'}
var current_stream = null;

function twitterSubscribe() {
  client.stream('statuses/filter', stream_params,  function(stream){

    console.log("Subscribed with params ", stream_params);
    current_stream = stream;

    stream.on('data', function(tweet) {
      // Send this new tweet to the browser via websockets, on event 'new_tweet'
      sails.sockets.blast('new_tweet', tweet);
    });

    stream.on('error', function(error) {
      console.log(error);
    });

  });

}

// UNSUBSCRIPTION TO THE STREAM API

function twitterUnsubscribe() {
  if (current_stream != null) {
    console.log("Destroying twitter subscription");
    current_stream.destroy();
  }
}

twitterSubscribe();



module.exports = {
  setHashtag: function (req, res) {

    // SET NEW HASHTAG
    twitterUnsubscribe();

    stream_params.track = 'devsgonnadev'; //New hashtag goes here
    twitterSubscribe();

    res.json(stream_params);
  },

  // SEARCH API QUERY
  // SEE THE JSON AT hashtag.allgo.mx/tweets/list
  // !!! PLEASE NOTE THAT IT CONSUMES TWEETS FROM LAST WEEK ONLY !!!

	list: function (req, res) {
    var params = {q: 'browserdiscrimination', count: 200};
    client.get('search/tweets', params, function(error, tweets, response){
      if (!error) {
        res.json(tweets);
      }
    });
  }
};

