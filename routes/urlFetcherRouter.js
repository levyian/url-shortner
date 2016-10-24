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
    
urlFetcherRouter.get('/:url_shortened', function(req, res, next) {
    next(new Error("Didnt find url"));
    // urlModel.findOne({'original': req.params.url_shortened}, {'original.$': 1},
    //     function (err, url) {
    //         if (err) {
    //             console.log(err);
    //             next(err);
    //         } else {
    //             console.log(url);
    //             res.status(200);
    //             res.send("ok");
                // res.redirect('https://' + req.hostname+':' + app.get('secPort') + req.url);
    //         }
    //     }
    // );
});
    
module.exports = urlFetcherRouter;