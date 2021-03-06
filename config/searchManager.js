var greenhouse = require('./searchers/greenhouse');
var lever = require('./searchers/lever');
var icims = require('./searchers/icims');
var jazz = require('./searchers/greenhouse');
var jobvite = require('./searchers/jobvite');
var taleo = require('./searchers/taleo');
var angelList = require('./searchers/angelList');

var Search = require('../database/SearchController');
var searchQueue = require('./searchQueue');
var mailer = require('./mailer');

module.exports.isRunning = false;

// Declare function to initiate the search process

module.exports.runSearch = function() {

  module.exports.isRunning = true;

  console.log('Search manager running state is now:', module.exports.isRunning);

  var metadata = searchQueue.getNext();

  if (metadata) {

    // angelList(metadata, function(moreData) {
    //   console.log('Completed search "' + metadata.label + '".  Notifying ' + metadata.email);
    //   Search.storeResults(moreData, metadata);
    //   mailer.notify(metadata, moreData.length);
    //   module.exports.runSearch();
    // });

    lever(metadata, function(data) {
      greenhouse(metadata, data, function(accData) {
        jobvite(metadata, accData, function(moreData) {
          console.log('Completed search "' + metadata.label + '".  Notifying ' + metadata.email);
          Search.storeResults(moreData, metadata);
          mailer.notify(metadata, moreData.length);
          module.exports.runSearch();
          
        });
      });
    });
    
  } else {
    module.exports.isRunning = false;
    console.log('No more searches to run in queue.  Halting process.  IsRunning now:', module.exports.isRunning);
    return;
  }

};