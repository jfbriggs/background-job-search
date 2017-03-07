var greenhouse = require('./searchers/greenhouse');
var lever = require('./searchers/lever');
var icims = require('./searchers/icims');
var jazz = require('./searchers/greenhouse');
var jobvite = require('./searchers/jobvite');
var taleo = require('./searchers/taleo');

var Search = require('../database/SearchController');

var searchQueue = require('./searchQueue');

// Declare function to initiate the search process

module.exports = function(metadata) {

  lever(metadata, function(data) {
    console.log('GOT THE DATA IN MANAGER.', data);
    Search.storeResults(data, metadata);
  });
  // results.push(greenhouse(input));
  // results.push(icims(input));
  // results.push(jazz(input));
  // results.push(jobvite(input));
  // results.push(taleo(input));

  // Search.storeResults(results, metadata);

};