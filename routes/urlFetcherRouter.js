'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat-light')

var timestampRouter = express.Router();
timestampRouter.use(bodyParser.json());

timestampRouter.route('/')
    .get(function(req, res) {
        res.send("Please submit a timestamp value to be processed");
    });
    
timestampRouter.route('/:timestamp')
    .get(function(req, res) {
        var timestamp = isNaN(req.params.timestamp)? req.params.timestamp: parseInt(req.params.timestamp);
        var date = new Date(timestamp);
        var validDate = Object.prototype.toString.call(date) === '[object Date]' && isFinite(date);
        res.json({
            unix: validDate? date.getTime() : null,
            natural: validDate? dateFormat(date, "fullDate") : null
        });
    });
    
module.exports = timestampRouter;