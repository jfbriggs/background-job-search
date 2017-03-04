var router = require('express').Router();

var searchQueue = require('./searchQueue');

// ====== API ROUTING =====

// When a search request is received, add it to in-memory queue

router.post('/search', function(req, res) {
  searchQueue.addSearch(req, res);
});


module.exports = router;