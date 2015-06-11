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


// Initialize database
var Persist = require('node-persist');
Persist.initSync({
  dir: process.env.PWD + '/persist'
});

// If database is clean, setup default hashtag.
if (! Persist.getItem('hashtag')) {
  Persist.setItem('hashtag', 'browserdiscrimination');
}

// If no tweets stored in DB, retrieve last 200
if (! Persist.getItem('tweets')) {
  fetchTweets();  
}


function fetchTweets() {
    var hashtag = Persist.getItem('hashtag');
    var params = {q: hashtag, count: 200};
    client.get('search/tweets', params, function(error, tweets, response){
      if (!error) {
        Persist.setItem('tweets', tweets);
      }
    });
}


// SUBSCRIPTION TO THE STREAM API VIA WEBSOCKETS


var current_stream = null;

function twitterSubscribe() {
  var hashtag = Persist.getItem('hashtag');
  var stream_params = {track: hashtag}  

  client.stream('statuses/filter', stream_params,  function(stream){

    console.log("Subscribed with params ", stream_params);
    current_stream = stream;

    stream.on('data', function(tweet) {
      // Send this new tweet to the browser via websockets, on event 'new_tweet'
      sails.sockets.blast('new_tweet', tweet);

      // Also, store this tweet on db
      var tweets = Persist.getItem('tweets');
      tweets.statuses.unshift(tweet);
      Persist.setItem('tweets', tweets);
      
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
    var hashtag = 'devsgonnadev'; //New hashtag goes here req.params.hashtag


    // cancel previous twitter subscription
    twitterUnsubscribe();

    // store new hashtag and fetch last 200 tweets, create a new subs.
    Persist.setItem('hashtag', hashtag);
    fetchTweets();
    twitterSubscribe();

    res.json({ok: true});
  },

  // SEARCH API QUERY
  // SEE THE JSON AT hashtag.allgo.mx/tweets/list
  // !!! PLEASE NOTE THAT IT CONSUMES TWEETS FROM LAST WEEK ONLY !!!

	list: function (req, res) {
    var tweets = Persist.getItem('tweets');
    res.json(tweets);
  }
};

