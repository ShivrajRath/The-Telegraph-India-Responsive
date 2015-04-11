(function () {
  'use strict';

  // Node dependencies
  var express = require('express'),
    path = require('path');

  // Creation of app
  var app = express();

  // Public resources
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/bower_components', express.static(__dirname + '/bower_components'));

  // Config File
  var config = require('./server/config.json')[app.get('env')];

  // App APIs
  require('./server/api')(app);

  app.all('/*', function (req, res) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('./public/index.html', {
      root: __dirname
    });
  });

  // APP LISTNER
  var port = process.env.PORT || config.port;
  app.listen(port);
  console.log('Application started on port: ' + port);
})();
