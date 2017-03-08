var Queue = require('../utils/queue');
var searchManager = require('./searchManager');

// Create in-memory queue of searches to be run

var key = 'Ap2jgrawAB@R(@r903bur3b3bABFiabojosabij2r02bjrwabWABIFJBAWIBwjooeijsoijvoasijvowirAB';

var searchQueue = new Queue();

module.exports.addSearch = function(req, res) {
  var searchObj = {
    city: req.body.city,
    title: req.body.title,
    email: req.body.email,
    label: req.body.label
  };

  console.log(searchManager.isRunning);

  if (req.body.key === key) {
    console.log('New search request from user: ' + req.body.user + '.  Key matches, adding search with label: ' + req.body.label);
    searchQueue.add(searchObj);
    res.sendStatus(200);
    console.log('Running?', searchManager.isRunning);
    if (searchManager.isRunning === false) {
      console.log('Search Manager not currently running.  Activating.')
      searchManager.runSearch();
    }
  } else {
    console.log('New search request from user:' + req.body.user + ' .  Key does not match.  Not adding.');
    res.sendStatus(400);
  }

  console.log('There are now', searchQueue.getSize(), 'searches in the queue.');
}

module.exports.getNext = function() {
  if (searchQueue.getSize() > 0) {
    return searchQueue.pull();
  }
  return null;
}