// console.log('this is loaded');

exports.twitterKeys = {
  consumer_key: 'uiA44E7MqaNhytrYvRPImbaVY',
  consumer_secret: 'l5W0h6PRzc4UescWGXbk1DCaJboHnHlxtooRAduNdJre10oTeC',
  access_token_key: '851860669003702272-f0TlosQdUpzDwrAGXxzONXkO0g0tXng',
  access_token_secret: 'QitrLa9r70B7dU3QBSzW22FbmDf3nqmojd9XzoELKwxdD',
}

//owner ID 851860669003702272

const fs = require('fs')

let filename = 'random.txt'
let contents = 'spotify-this-song,"I Want it That Way"'

//these commands are to write new files but I'm worried the liri.js file will get obliterated every time you run node so I commented it out:

// fs.writeFile(filename,contents,function(err) {

// if(err) {

// 	console.log(err);

// }

// else {

// 	console.log('Success!')

// }

// });


// let javaFile = 'liri.js'

// fs.writeFile(javaFile,"/* This is a node generated javascript file */",function(err) {

// if(err) {

// 	console.log(err);

// }

// else {

// 	console.log('Success!')

// }


// })