var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var searchManager = require('./config/searchManager');

var router = require('./config/routes');

// === Define web server port ===
var port = process.env.PORT || 4111;

// === Connect to Mongo ===
mongoose.connect('mongodb://localhost/jobsearch');

// ===== MIDDLEWARE =====

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Directs all api requests to the router
app.use('/api/', router);

// TEST DATA =======================
var metadata = {
  label: 'SWE 2017 LA',
  title: 'software engineer',
  city: 'los angeles',
  userId: '1ifjir022g020g3',
  email: 'jack@example.com'
};

searchManager(metadata);

// =================================

app.listen(port, function() {
  console.log('Background-Job-Search now running on port', port);
});