var greenhouse = require('./searchers/greenhouse');
var lever = require('./searchers/lever');
var icims = require('./searchers/icims');
var jazz = require('./searchers/greenhouse');
var jobvite = require('./searchers/jobvite');
var taleo = require('./searchers/taleo');

var Search = require('../database/SearchController');

var searchQueue = require('./searchQueue');

module.exports.isRunning = false;

// Declare function to initiate the search process

module.exports.runSearch = function() {

  module.exports.isRunning = true;

  console.log('Search manager running state is now:', module.exports.isRunning);

  var metadata = searchQueue.getNext();

  if (metadata) {
    lever(metadata, function(data) {
      console.log('GOT THE DATA IN MANAGER.', data);
      Search.storeResults(data, metadata);
      module.exports.runSearch();
    });
  } else {
    console.log('No more searches to run in queue.  Halting process.');
    isRunning = false;
    return;
  }

};

// TEST DATA/FUNCTION ==============

// var metadata = {
//   label: 'SWE 2017 LA',
//   title: 'software engineer',
//   city: 'los angeles',
//   userId: '1ifjir022g020g3',
//   email: 'jack@example.com'
// };

// runSearch(metadata);

// =================================