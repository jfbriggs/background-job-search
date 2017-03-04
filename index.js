var express = require('express');
var app = express();
var mongoose = require('mongoose');

var port = process.env.PORT || 4111;

// Connect to Mongo

mongoose.connect('mongodb://localhost/jobsearch');

app.listen(port, function() {
  console.log('Background-Job-Search now running on port', port);
});