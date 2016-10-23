'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var urlModel = require('../models/urls');

var urlFetcherRouter = express.Router();
urlFetcherRouter.use(bodyParser.json());

urlFetcherRouter.route('/')
    .get(function(req, res) {
        res.json({
            error: "Please submit a valid shortened url to lookup."
        });
    });
    
urlFetcherRouter.route('/:url_shortened')
    .get(function(req, res, next) {
        urlModel.findOne({'original': req.params.url_shortened}, {'original.$': 1},
            function (err, url) {
                if (err) {
                    console.log(err);
                    next(err);
                } else {
                    console.log(url);
                }
            }
        );
    });
    
module.exports = urlFetcherRouter;