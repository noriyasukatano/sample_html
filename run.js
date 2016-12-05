
//read rss
google.load("feeds", "1"); //APIを読み込みます

function initialize(){
	//RSSの指定
	var feed = new google.feeds.Feed("http://tequila73.at.webry.info/rss/index.rdf"); //読み込むRSSフィードを設定します
	var noPhoto = ("<img src='noimage.png' />"); //画像がなかった場合に表示する画像を指定します

	feed.setNumEntries(5); //記事を読み込む件数を設定します
	feed.load(dispfeed);

	function dispfeed(result){

		if(!result.error){
			var container = document.getElementById("feed"); //HTMLに書き出す対象のIDを指定します

			for (var i = 0; i < result.feed.entries.length; i++) {

				var entry = result.feed.entries[i];

				var entryDate = new Date(entry.publishedDate); //日付を取得します。　以下二桁処理をします
				var entryYear = entryDate.getYear();
				if (entryYear < 2000){
					entryYear += 1900;
				}
				var entryMonth = entryDate.getMonth() + 1;
				if (entryMonth < 10) {
					entryMonth = "0" + entryMonth;
				}
				var entryDay = entryDate.getDate();
				if (entryDay < 10) {
					entryDay = "0" + entryDay;
				}
				var date = entryYear + "年" + entryMonth + "月" + entryDay + "日";

				var entryImg = "";
				var imgCheck = entry.content.match(/(src="http:)[\S]+((\.jpg)|(\.JPG)|(\.jpeg)|(\.JPEG)|(\.gif)|(\.GIF)|(\.png)|(\.PNG))/); //画像のチェックをします　拡張子はここで増やします
				if(imgCheck){
					entryImg += '<img ' + imgCheck[0] + '" >';
					} else {
						entryImg += noPhoto;
				}

				container.innerHTML += '<li><a href="' + entry.link + '"><article>'
				+ entryImg
				+ date
				+ '<h2>'
				+ entry.title + '</h2>'
				+ '<span>'
				+ entry.contentSnippet.substring(0,120) +'</span>'
				+ '</article></a></li>';
			}

			var linkBlank = container.getElementsByTagName('a'); // targetに'_blank'を設定します。不要な場合は、以下4行を削除
			for (var j = 0, l = linkBlank.length; j < l; j++) {
				linkBlank[j].target = '_blank';
			} //target'_blank'ここまで
		}
	}
}
google.setOnLoadCallback(initialize);
