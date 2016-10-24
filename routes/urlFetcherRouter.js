'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var urlModel = require('../models/urls');

var urlFetcherRouter = express.Router();
urlFetcherRouter.use(bodyParser.json());

urlFetcherRouter.get('/', function(req, res, next) {
    var err = new Error("Please submit a valid shortened url to lookup.");
    err.status = 400;
    next(err);
});
    
urlFetcherRouter.get('/:url_index', function(req, res, next) {
    urlModel.findOne(
        { 'short_url': process.env.URL + req.params.url_index },
        'original_url',
        function (err, url) {
            if (err || url === null) {
                next((err || new Error("The given shortened URL is invalid")));
            } else {
                console.log("redirecting to", url.original_url);
                res.redirect(url.original_url);
            }
        }
    );
});
    
module.exports = urlFetcherRouter;