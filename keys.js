// console.log('this is loaded');

exports.twitterKeys = {
  consumer_key: 'ClzYQhWbTocRsHphfwQ70sxcr',
  consumer_secret: '5COaXrsiohvUQZleGjvCVnl2exIGdLnVqvutW9hYgRV6iL7uoJ',
  access_token_key: '874247816524312576-gTjBc1CVfAL9ieFMbSjKcA80WlOlKud',
  access_token_secret: 'QF04NhIZIcWG0bJ5yIh8tqqkEVEgOqrb7b6BZmfPwVIOy',
}

//owner ID 	874247816524312576

const fs = require('fs')

let filename = 'random.txt'
let contents = 'movie-this,"2001: A Space Odyssey"'


fs.writeFile(filename,contents,function(err) {

if(err) {

	console.log(err);

}

else {

	console.log('Success!')

}

});


let logName = 'log.txt'
let logText = "";


fs.writeFile(logName,logText,function(err) {

			if(err) {
				console.log(err);
			}

			else {
				console.log('Log File Written!')
			}

});