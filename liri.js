/* This is a node generated javascript file */

     var keys = require('./keys.js');
     var auth = keys.twitterKeys;
     var action = process.argv[2];
     var movie = process.argv[3];
   
    

     switch (action) {

case "my-tweets":
tweet();
break;

case "movie-this":
movie();
break;

}

//need variables for ajax urls and keys

var movieUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=40e9cece'

var posterUrl = 'http://img.omdbapi.com/?i=tt3896198&h=600&apikey=40e9cece'

//they will probably have to be passed into the functions

//Function Junction

function tweet(auth){
	
/* This will show your last 20 tweets and when they were created at in your terminal/bash window.*/

			var Twitter = require('twitter');
			 
			var client = new Twitter({
			  consumer_key: auth.consumer_key,
			  consumer_secret: auth.consumer_secret,
			  access_token_key:  auth.access_token_key,
			  access_token_secret: auth.token
			});
 
			var params = {screen_name: 'nodejs'};
			client.get('statuses/user_timeline', params, function(error, tweets, response) {
			  if (!error) {
			    console.log(tweets);
			  }
			});

			var request = require('request');
			request('http://www.google.com', function (error, response, body) {
			  console.log('error:', error); // Print the error if one occurred 
			  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
			  console.log('body:', body); // Print the HTML for the Google homepage. 
			});

}

function movie(movieUrl){

				$.ajax ({
			url: movieUrl,
			Method: “GET”
			}).done(function(response) {

			console.log(response);

		});

}




     	



