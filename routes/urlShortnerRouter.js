'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var urlModel = require('../models/urls');

var urlShortnerRouter = express.Router();
urlShortnerRouter.use(bodyParser.json());

urlShortnerRouter.get('/', function(req, res, next) {
    var err = new Error("Please submit a valid url to be shortened.");
    err.status = 400;
    next(err);
});
    
urlShortnerRouter.get('/:url', function(req, res, next) {
  //replace %2f -> /
    urlModel.create(
      { original_url: req.params.url.replace(/%2F/g, "/") }, 
      function(err, url_shortened) {
        if (err) { next(err); }
        else {
          console.log('URL created!');
          res.status(200)
            .json({
              original_url: url_shortened.original_url,
              short_url: url_shortened.short_url
            });
        }
    });
});
    
module.exports = urlShortnerRouter;