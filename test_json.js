var twit = require('twit');
var fs = require('fs');
var file = 'twitter.json';
var tweet= new twit({
  consumer_key: 'e9PjtaBRSyNXSvlkNDDWl6Slj',
  consumer_secret: 'NdbPlRJEoPMHf7cZcXx3I8xUu6m1SMAOCTAViL0wVxIEogitFN',
  access_token_key: '475417967-kvuUShYq34wDpCvdHVjZ0jsBOGMPwyQsz91A2k7U',
  access_token_secret: 'ozZoMYM6aMDus4vLVewQQLSdhTONs3AEBzsuzY11EsHrw'
});

var getStream = tweet.stream('statuses/filter', {track: '#NowPlaying'});
getStream.on('tweet', function(tw) {
  fs.writeFile(file, JSON.stringify(tw), null, null);
  fs.readFile(file, 'utf8', function (err, tw) {
    console.log(JSON.stringify(tw));
  });
});
