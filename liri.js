/* This is a node-created javascript file */
const fs = require('fs')
var keys = require('./keys.js');
var auth = keys.twitterKeys;
var action = process.argv[2];
var movie = process.argv[3];
var movieData = [];
var movieUrl;
var posterUrl;

//create a use case for when no movie is entered as an action

if (!movie) {

    movieUrl = 'http://www.omdbapi.com/?t=' + 'Mr. Nobody' + '&apikey=40e9cece'
    posterUrl = 'http://img.omdbapi.com/t=' + 'Mr. Nobody' + '&h=600&apikey=40e9cece'

}

// assign variables to the movie parameter
else {

    movieUrl = 'http://www.omdbapi.com/?t=' + movie + '&apikey=40e9cece'
    posterUrl = 'http://img.omdbapi.com/t=' + movie + '&h=600&apikey=40e9cece'

}

//create switch cases for each action called upon by user in the command line

switch (action) {

    case "my-tweets":
        tweets();

        function tweets() {

            var Twitter = require('twitter');

            var client = new Twitter(auth);

            var params = {
                screen_name: 'ThaDevelYouKnow',
                count: 20
            };

            client.get('statuses/user_timeline', params, function gotData(error, tweets, response) {
                if (error) {
                    console.log('error:', error);
                } else {

                    for (let status in tweets)

                    {
                        console.log("\n" + tweets[status].text + "\n");

                        fs.appendFile("log.txt", ", " + tweets[status].text.trim(), function(err) {
                            if (err) {
                                return console.log(err);
                            }
                        });
                    }
                }
            });
        }

        break;

    case "movie-this":

        movieMaker();

        
        	  function movieMaker(movieUrl) {

            	var request = require('request');

            	request(movieUrl, function(error, response, body) {

                body = body.split('"');

                if (error) {
                    console.log('error:', error);
                }

                movieData = "Action Called: " + "," + "movie-this" + ", " + "Title: " + ", " + (body[body.indexOf("Title") + 2] + ", " + "Year: " + ", " + body[body.indexOf("Year") + 2] + ", " +
                    "IMDb Rating: " + ", " + body[body.indexOf("imdbRating") + 2] + ", " +
                    "Rotten Tomatoes: " + ", " + body[body.indexOf("Rotten Tomatoes") + 4] +
                    ", " + "Actors: " + ", " + body[body.indexOf("Actors") + 2] +
                    ", " + "Language: " + ", " + body[body.indexOf("Language") + 2] + ", " +
                    "Country: " + "," + body[body.indexOf("Country") + 2] + ", " +
                    "Plot: " + ", " + body[body.indexOf("Plot") + 2] + ", " +
                    "Website: " + ", " + body[body.indexOf("Website") + 2]).trim();

                console.log(body[body.indexOf("Title") + 2] + "\n" + body[body.indexOf("Year") + 2] + "\n" +
                    "IMDb Rating: " + body[body.indexOf("imdbRating") + 2] + "\n" +
                    "Rotten Tomatoes: " + body[body.indexOf("Rotten Tomatoes") + 4] + "\n" +
                    "Actors: " + body[body.indexOf("Actors") + 2] + "\n" +
                    "Language: " + body[body.indexOf("Language") + 2] + "\n" +
                    "Country: " + body[body.indexOf("Country") + 2] + "\n" +
                    "Plot: " + body[body.indexOf("Plot") + 2] + "\n" +
                    "Website: " + body[body.indexOf("Website") + 2]);
                // console.log('statusCode:', response && response.statusCode); 

                fs.appendFile("log.txt", ", " + movieData, function(err) {
                    if (err) {
                        return console.log(err);
                    }

                });
            });
          };
        
        break;


    case "do-what-it-says":

        fs.readFile("random.txt", "utf8", function(err, data) {

        	        if (err) {

                return console.log(err);
            }

            data = data.split(",");
            
            action = data[0]
            movie = data[1]
            console.log(action);
            console.log(movie);

			if (action === "movie-this") {

                movieUrl = 'http://www.omdbapi.com/?t=' + movie + '&apikey=40e9cece'
                console.log(movieUrl);
                movieMaker(movieUrl);
                console.log(movie);
                console.log(action);

            } else if (action === "my-tweets") {

                tweets();

            } else {

                console.log('You must make your entry in this format: "node liri.js movie-this "Mr. Nobody")')
            }
            
        });

            
}
