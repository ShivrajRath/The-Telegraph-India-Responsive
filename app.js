// NPM Packages
var request = require('request'),
  FeedParser = require('feedparser'),
  fs = require('fs'),
  read = require('node-readability');

readLink();

//http://www.telegraphindia.com/feeds/rss.jsp?id=3

function readLink() {

  read('http://www.telegraphindia.com/1150328/jsp/frontpage/story_11325.jsp', function (err, article, meta) {
    // Main Article
    console.log(article.content);
  
    // Close article to clean up jsdom and prevent leaks
    article.close();
  });
}