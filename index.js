var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var mailSender = require('./config/mailer');

var searchManager = require('./config/searchManager');

var router = require('./config/routes');

// === Define web server port ===
var port = process.env.PORT || 4111;

// === MAILER FUNCTIONALITY ===

var rootDir = __dirname;
mailSender(app, express, rootDir);

// === Connect to Mongo ===
mongoose.connect('mongodb://jobthrust:getj0bsm8@ds119810.mlab.com:19810/jobthrust-mongo');

// ===== MIDDLEWARE =====

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Directs all api requests to the router
app.use('/api/', router);

app.listen(port, function() {
  console.log('Background-Job-Search now running on port', port);
});