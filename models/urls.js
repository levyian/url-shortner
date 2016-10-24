'use strict';

// grab the things we need
var mongoose = require('mongoose');
var url_valid = require('valid-url');
var Schema = mongoose.Schema;

//schema for the counter
var CounterSchema = new Schema({
  _id: { 
    type: String, 
    required: true
  },
  seq: {
    type: Number,
    default: 0
  }
});

var counter = mongoose.model('counter', CounterSchema);

//schema for the url
var urlSchema = new Schema({
    original_url: {
      type: String,
      required: true
    },
    short_url: {
      type: String,
      unique: true
    }
}, {
    timestamps: true
});

//sanity check for the urls
urlSchema.pre("save", function(next) {
  var doc = this;
  //create short_url given original url is valid
  if (url_valid.isWebUri(doc.original_url)) {
    counter.findByIdAndUpdate(
      { _id: 'entityId' },
      { $inc: { seq: 1} },
      { new: true, upsert: true },
      function(err, count) {
        if (err) { return next(err); }
        
        doc.short_url = process.env.URL + count.seq;
        next();
    });
  } else {
    var err = new Error("URL not valid.");
    err.status = 500;
    next(err);
  }
});

// the schema is useless so far
// we need to create a model using it
var URLs = mongoose.model('URL', urlSchema);

// make this available to our Node applications
module.exports = URLs;
