var Queue = require('../utils/queue');

// Create in-memory queue of searches to be run

var key = 'Ap2jgrawAB@R(@r903bur3b3bABFiabojosabij2r02bjrwabWABIFJBAWIBwjooeijsoijvoasijvowirAB';

var searchQueue = new Queue;

module.exports.addSearch = function(req, res) {
  var searchObj = {
    city: req.body.city,
    title: req.body.title,
    userId: req.body.user,
    emamil: req.body.email,
    label: req.body.name
  };

  if (req.body.key === key) {
    console.log('New search request from user: ' + req.body.user + '.  Key matches, adding search with label: ' + req.body.name);
    searchQueue.add(searchObj);
    res.sendStatus(200);
  } else {
    console.log('New search request from user:' + req.body.user + ' .  Key does not match.  Not adding.');
    res.sendStatus(400);
  }

  console.log('There are now', searchQueue.getSize(), 'searches in the queue.');
}

module.exports.getNext = function() {
  if (searchQueue.getsize() > 0) {
    return searchQueue.pull();
  }
  return null;
}