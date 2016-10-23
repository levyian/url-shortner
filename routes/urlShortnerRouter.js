'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var urlModel = require('../models/urls');

var urlShortnerRouter = express.Router();
urlShortnerRouter.use(bodyParser.json());

urlShortnerRouter.route('/')
    .get(function(req, res) {
        res.json({
            error: "Please submit a valid url to be shortened."
        });
    });
    
urlShortnerRouter.route('/:url')
    .get(function(req, res, next) {
        urlModel.create({original: req.params.url}, function(err, url_shortened) {
          if (err) { next(err); }
          else {
            console.log('URL created!');
            res.status(200)
              .json(url_shortened);
          }
        });
    });
    
module.exports = urlShortnerRouter;