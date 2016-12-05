
google.load("feeds","1");
var FA = new Array //表示させたいRSSフィードのURLを配列に代入
("http://feedblog.ameba.jp/rss/ameblo/asakaza1224/rss20.xml",
"http://tequila73.at.webry.info/rss/index.rdf",
"http://nke.seesaa.net/index20.rdf");

function initialize() {
	var feedsArr = new Array();
	var numEntr = 3; //各RSSフィードの取得件数
	var container = document.getElementById("feed");
	var cnt = FA.length;
	for (var k=0; k<FA.length; k++) {
		var feed = new google.feeds.Feed(FA[k]);
		feed.setNumEntries(numEntr);
		feed.setResultFormat(google.feeds.Feed.JSON_FORMAT);
		feed.load(function(result) {
			if (!result.error) {
				for (var i = 0; i < result.feed.entries.length; i++) {
					var entry = result.feed.entries[i];
					var attributes = ["title", "link", "publishedDate", "contentSnippet"];
					var ind = feedsArr.length;
					feedsArr[ind] = new Array();
					feedsArr[ind][0] = Date.parse(entry[attributes[2]]); // 日付順にソート
					feedsArr[ind][1] = entry[attributes[1]]; // リンク
					feedsArr[ind][2] = entry[attributes[2]]; // 更新日時
					feedsArr[ind][3] = entry[attributes[3]]; // 記事本文
					feedsArr[ind][4] = entry[attributes[0]]; // 記事タイトル
					feedsArr[ind][5] = result.feed.title; // サイトタイトル
				}
			}


			cnt--;
			if (cnt == 0) {
				feedsArr.sort();
				feedsArr.reverse();
				for (var j = 0; j < feedsArr.length;  j++) {
					var aE = document.createElement("A");
					var h3 = document.createElement("H3");
					var p = document.createElement("P");
					var spanD = document.createElement("SPAN");
					aE.href=aE.title=feedsArr[j][1];
					aE.appendChild(document.createTextNode(feedsArr[j][4]));
					h3.appendChild(aE);
					spanD.appendChild(document.createTextNode(feedsArr[j][2]));
					spanD.appendChild(document.createTextNode(" ("+feedsArr[j][5]+")"));
					p.appendChild(document.createTextNode(feedsArr[j][3]));
					p.appendChild(spanD);
					container.appendChild(h3);
					container.appendChild(p);
				}
			}
		});
	}
}
google.setOnLoadCallback(initialize);
