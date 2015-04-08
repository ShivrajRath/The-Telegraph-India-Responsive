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

  // APP LISTNER
  var port = process.env.PORT || config.port;
  app.listen(port);
  console.log('Application started on port: ' + port);
})();
