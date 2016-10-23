'use strict';

var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');

//setup database
mongoose.connect(process.env.MONGODB_URI, { config: { autoIndex: false } });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});

//routes
var urlShortner = require('./routes/urlShortnerRouter');
var urlFetcher = require('./routes/urlFetcherRouter');

//setup public folder
app.use(express.static(path.join(__dirname, 'public')));

//set routes
app.use('/', urlFetcher);
app.use('/new', urlShortner);

app.listen((process.env.PORT || 8080), function () {
  console.log('Example app listening on port 8080!');
});