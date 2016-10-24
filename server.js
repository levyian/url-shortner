'use strict';

var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//setup database
mongoose.connect(process.env.MONGODB_URI, { config: { autoIndex: false } });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//setup public folder
app.use(express.static(path.join(__dirname, 'public')));

//configure app to encode // in URL (https://) -> (https:%252F%252F)
//do this only on get request where /new is before it
app.all('*', function(req, res, next) {
  var encodedURL;
  if (req.method === "GET" && 
    (encodedURL = /(\/new\/http[s]?:)(\/\/.+\..+)/.exec(req.url)) != null) {
      req.url = encodedURL[1] + encodedURL[2].replace(/\//g, "%252F");
  }
  return next();
});

//routes
var urlShortner = require('./routes/urlShortnerRouter');
var urlFetcher = require('./routes/urlFetcherRouter');

//set routes
app.use('/new', urlShortner);
app.use('/', urlFetcher);

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      error: err.message,
      full_log: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: err.message
  });
});

app.listen((process.env.PORT || 8080), function () {
  console.log('Example app listening on port 8080!');
});