// twitterモジュールを読み込み
var twitter = require('twitter');

// アプリ登録時に取得したkeyを入れてOAuth認証し、初期化
var client = new twitter({
    consumer_key: 'e9PjtaBRSyNXSvlkNDDWl6Slj',
    consumer_secret: 'NdbPlRJEoPMHf7cZcXx3I8xUu6m1SMAOCTAViL0wVxIEogitFN',
    access_token_key: '475417967-kvuUShYq34wDpCvdHVjZ0jsBOGMPwyQsz91A2k7U',
    access_token_secret: 'ozZoMYM6aMDus4vLVewQQLSdhTONs3AEBzsuzY11EsHrw'
});

/*// Public APIのstatuses/filterで取得したタイムラインを、自分のアカウント名を含む文字列でフィルターする
client.stream( 'statuses/filter', { track : '@norizou4' }, function( stream ) {
    // フィルターされたデータのストリームを受け取り、ツイートのテキストを表示する
    stream.on( 'data', function( data ) {
        var text = data.text; // ツイートのテキスト
        var textCleaned = text.replace( /@norizou4/g, "" ); // アカウント名は不要
        console.log( textCleaned );
    });
});*/

client.post('statuses/update',
        {status: 'Hello world (このツイートはテストです)'},
        function(error, tweet, response) {
        if (!error) {
            console.log(tweet)
        }
      });
