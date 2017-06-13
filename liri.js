/* This is a node-created javascript file */

const fs = require('fs')
var keys = require('./keys.js');
var auth = keys.twitterKeys;
var action = process.argv[2];
var movie = process.argv[3];
var posterUrl;
var actionData='';

//create a use-case for when no movie is entered as an action

if (!movie) {

    var movieUrl = 'http://www.omdbapi.com/?t=' + 'Mr. Nobody' + '&apikey=40e9cece'
    var posterUrl = 'http://img.omdbapi.com/t=' + 'Mr. Nobody' + '&h=600&apikey=40e9cece'

}

// assign variables to the movie parameter

else {

    var movieUrl = 'http://www.omdbapi.com/?t=' + movie + '&apikey=40e9cece'
    var posterUrl = 'http://img.omdbapi.com/t=' + movie + '&h=600&apikey=40e9cece'

}

//create switch cases for each action called upon by user in the command line

switch (action) {

    case "my-tweets":
        tweets();

        function tweets() {

        	//this function makes the API call as per outlined in the Twitter documentation

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

//this function appends the data to a log.txt file
						actionData = tweets[status].text.trim()
                        appendData(actionData);
                       
                    }
                }
            });
        }

        break;

    case "movie-this":

        movieMaker(movieUrl);

//this function makes the API call as per outlined in the OMDB documentation

        function movieMaker(movieUrl) {

            var request = require('request');

            request(movieUrl, function(error, response, body) {

//this command parses the information coming from OMDB

                body = body.split('"');

                if (error) {
                    console.log('error:', error);
                }
//movieData is a rather elaborate formatting to log.txt each movie entry as if I wanted to access it as a parsed JSON later

				
                actionData = "Action Called: " + "," + "movie-this" + ", " + "Title: " + ", " + (body[body.indexOf("Title") + 2] + ", " + "Year: " + ", " + body[body.indexOf("Year") + 2] + ", " +
                    "IMDb Rating: " + ", " + body[body.indexOf("imdbRating") + 2] + ", " +
                    "Rotten Tomatoes: " + ", " + body[body.indexOf("Rotten Tomatoes") + 4] +
                    ", " + "Actors: " + ", " + body[body.indexOf("Actors") + 2] +
                    ", " + "Language: " + ", " + body[body.indexOf("Language") + 2] + ", " +
                    "Country: " + "," + body[body.indexOf("Country") + 2] + ", " +
                    "Plot: " + ", " + body[body.indexOf("Plot") + 2] + ", " +
                    "Website: " + ", " + body[body.indexOf("Website") + 2]);

                console.log(body[body.indexOf("Title") + 2] + "\n" + body[body.indexOf("Year") + 2] + "\n" +
                    "IMDb Rating: " + body[body.indexOf("imdbRating") + 2] + "\n" +
                    "Rotten Tomatoes: " + body[body.indexOf("Rotten Tomatoes") + 4] + "\n" +
                    "Actors: " + body[body.indexOf("Actors") + 2] + "\n" +
                    "Language: " + body[body.indexOf("Language") + 2] + "\n" +
                    "Country: " + body[body.indexOf("Country") + 2] + "\n" +
                    "Plot: " + body[body.indexOf("Plot") + 2] + "\n" +
                    "Website: " + body[body.indexOf("Website") + 2]);
                // console.log('statusCode:', response && response.statusCode); 

//this function appends the data to a log.txt file

                
            });

             appendData(actionData);
        };

       

        break;

    case "do-what-it-says":

        fs.readFile("random.txt", "utf8", function(err, data) {

            if (err) {

                return console.log(err);
            }

            data = data.split(",");
            console.log(data);
            action = data[0]
            movie = data[1]

            if (action === "movie-this") {

                movieUrl = 'http://www.omdbapi.com/?t=' + movie + '&apikey=40e9cece'
                movieMaker(movieUrl);
               

            } else if (action === "my-tweets") {

                tweets();
                actionData = tweets[status].text.trim()
                appendData(actionData);

            } else {

                console.log('You must make your entry in this format: "node liri.js movie-this "Mr. Nobody")')
            }

        });

        appendData(actionData);
        break;
}

function appendData(actionData){

fs.appendFile("log.txt", ", " + actionData, function(err) {
                    if (err) {
                        return console.log(err);
                    }
   });

}
