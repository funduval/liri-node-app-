const fs = require('fs')
const keys = require('./keys.js');
const auth = keys.twitterKeys;
var action = process.argv[2];
var movie = process.argv[3];
var posterUrl;
var movieData;
var tweetData;
var actionData = [];

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

            const Twitter = require('twitter');

            var client = new Twitter(auth);

            const params = {
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
                        tweetData = tweets[status].text.trim()
                        newLog.appendData(tweetData);
                    }

                    
                }

            });

        }
      

        break;

    case "movie-this":

        movieMaker();

        //this function makes the API call as per outlined in the OMDB documentation

        function movieMaker() {

            const request = require('request');

            request(movieUrl, function(error, response, body) {

                //this command parses the information coming from OMDB

                body = JSON.parse(body);
                var ratings = body.Ratings
                ratings = ratings[1]

                if (error) {
                    console.log('error:', error);
                }

                //action Data holds the formatting to pretty-log each movie entry
                else {

                    movieData = "Action Called: " + action + "\nTitle: " + body.Title + "\nYear: " + body.Year + "\nIMDb Rating: " + body.imdbRating + "\nRotten Tomatoes: " + ratings.Value + "\nActors: " + body.Actors + "\nLanguage: " + body.Language +
                        "\nCountry: " + body.Country + "\nPlot: " + body.Plot + "\nWebsite: " + body.Website

                    console.log(movieData);

                    // console.log('statusCode:', response && response.statusCode);
                    newLog.appendData(movieData);
                }
                
            });
        }
        
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

            } else {

                console.log('Aw, you entered no movie, so you get "Mr. Nobody"')
                movieUrl = 'http://www.omdbapi.com/?t=' + movie + '&apikey=40e9cece';
                movieMaker(movieUrl);
            }
        });

        break;

};

//this constructor function appends the data to a log.txt file

var newLog = new ActionLog(actionData)

function ActionLog(actionData) {

    this.actionData = actionData;

    this.appendData = function(actionData) {

        // console.log('ding');

        // console.log(actionData);

        fs.appendFile("log.txt", ",\n" + actionData, function(err) {

            if (err) {

                return console.log(err);

            } else {

                // console.log("actionData is: " + actionData)
            }
        });

        actionData=[];
    }
}
