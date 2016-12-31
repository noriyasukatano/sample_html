var http = require('http');
var socketio = require('socket.io');
var twitter = require('twitter');
var fs = require('fs');

var path = require('path');
var express = require('express');
var app = express();


// アプリ登録時に取得したkeyを入れてOAuth認証し、初期化
var twitter_client = new twitter({
    consumer_key: 'e9PjtaBRSyNXSvlkNDDWl6Slj',
    consumer_secret: 'NdbPlRJEoPMHf7cZcXx3I8xUu6m1SMAOCTAViL0wVxIEogitFN',
    access_token_key: '475417967-kvuUShYq34wDpCvdHVjZ0jsBOGMPwyQsz91A2k7U',
    access_token_secret: 'ozZoMYM6aMDus4vLVewQQLSdhTONs3AEBzsuzY11EsHrw'
});

app.use('/', express.static(path.join(__dirname, './')));
var http_server = app.listen(3000);

console.log('Server started: http://localhost:3000/');

var sio = socketio.listen(http_server);
sio.sockets.on('connection', function (socket) {
});

twitter_client.stream('statuses/filter', {track: 'linux'}, function(stream) {
  stream.on('data', function(tweet) {
    sio.sockets.emit('twitter_message', {'name': tweet.user.name, 'text': tweet.text})
  });

  stream.on('direct_message', function(direct_message) {
  console.log('direct_message',direct_message);
});

  stream.on('error', function(error) {
    console.log(error);
  });
});
