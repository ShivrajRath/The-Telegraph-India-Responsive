// NPM Packages
var request = require('request'),
	FeedParser = require('feedparser'),
	fs = require('fs');

var req = request('http://nodeweekly.com/rss/21ok1ccc'),
	feedparser = new FeedParser();



// Error on request
req.on('error', function( error ) {
	console.log( 'Request Error ' + error );
});

// Any response for the request
req.on('response', function( res ) {
	// This is a readable stream
	var stream = this;
	
	// Bad status code
	if ( res.statusCode !== 200){
		return this.emit('error', new Error('Bad status code'));
	}
	
	// Writing to feedparser writable stream	
	stream.pipe(feedparser);
});


// Feed parser error
feedparser.on('error', function(err){
	console.log('Feed error ' + err);
})

// Readable event of feedparser writable stream
feedparser.on('readable', function(){

	var stream = this,
		meta = this.meta,
		item;

	// Write to the the text file till writeable ends
	while(item = stream.read()){
		fs.appendFile('write.txt', JSON.stringify(item), function (err) {
			if (err){
				console.log('Error in writing file' + err);
			}else{
				console.log('Writing to file ...')
			}
		});
	}
})

