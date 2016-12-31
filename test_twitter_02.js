// twitterモジュールを読み込み
var twitter = require('twitter');

// アプリ登録時に取得したkeyを入れてOAuth認証し、初期化
var client = new twitter({
    consumer_key: 'e9PjtaBRSyNXSvlkNDDWl6Slj',
    consumer_secret: 'NdbPlRJEoPMHf7cZcXx3I8xUu6m1SMAOCTAViL0wVxIEogitFN',
    access_token_key: '475417967-kvuUShYq34wDpCvdHVjZ0jsBOGMPwyQsz91A2k7U',
    access_token_secret: 'ozZoMYM6aMDus4vLVewQQLSdhTONs3AEBzsuzY11EsHrw'
});

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
