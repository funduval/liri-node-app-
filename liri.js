/* This is a node generated javascript file */

     var keys = require('./keys.js');
     var auth = keys.twitterKeys;
     var action = process.argv[2];
     var movie = process.argv[3];


if (!movie) {

var movieUrl = 'http://www.omdbapi.com/?t=' + 'Mr. Nobody' + '&apikey=40e9cece'

var posterUrl = 'http://img.omdbapi.com/t=' + 'Mr. Nobody' + '&h=600&apikey=40e9cece'


}


else {

var movieUrl = 'http://www.omdbapi.com/?t=' + movie + '&apikey=40e9cece'

var posterUrl = 'http://img.omdbapi.com/t=' + movie + '&h=600&apikey=40e9cece'
   
}

     


     switch (action) {

case "my-tweets":

var Twitter = require('twitter');
			 
var client = new Twitter({
			  consumer_key: auth.consumer_key,
			  consumer_secret: auth.consumer_secret,
			  access_token_key: auth.access_token_key,
			  access_token_secret: auth.token
			});
 
var params = {screen_name: 'nodejs'};
			client.get('statuses/user_timeline', params, function(error, tweets, response) {
			  if (!error) {
			    console.log(tweets);
			  }
			});
break;



case "movie-this":



var request = require('request');

			request(movieUrl, function (error, response, body) {
					
			  body = body.split('"');

							  if (error) {
							    console.log('error:', error);
							  }

			  // console.log(body);

			  console.log(body[body.indexOf("Title") + 2] + ", " + body[body.indexOf("Year") + 2]); 
			  console.log("IMDb Rating: " + body[body.indexOf("imdbRating") + 2]); 
			  console.log("Rotten Tomatoes: " + body[body.indexOf("Rotten Tomatoes") + 4]);
			  console.log("Actors: " + body[body.indexOf("Actors") + 2]);
			  console.log("Language: " + body[body.indexOf("Language") + 2]);
			  console.log("Country of Release: " + body[body.indexOf("Country") + 2]);
			  console.log("Plot: " + body[body.indexOf("Plot") + 2]);
			  console.log("Rotten Tomatoes URL: ");
			
			  // console.log('statusCode:', response && response.statusCode); 

			});

break;

}








       








     	



