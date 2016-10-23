'use strict';

// grab the things we need
var mongoose = require('mongoose');
var url_valid = require('valid-url');
var Schema = mongoose.Schema;

//schema for the url
var urlSchema = new Schema({
    original: {
      type: String,
      required: true
    },
    short_url: {
      type: String,
      required: true,
      unique: true
    }
}, {
    timestamps: true
});

//sanity check for the urls
urlSchema.pre("save", function(next) {
  //if no image is provided then use the defaults
  if (url_valid.isWebUri(this.original)) {
    next();
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
