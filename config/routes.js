var router = require('express').Router();

var searchQueue = require('./searchQueue');
var searchController = require('../database/SearchController');

// ====== API ROUTING =====

// When a search request is received, add it to in-memory queue

router.post('/search', function(req, res) {
  searchQueue.addSearch(req, res);
});

// When a request for search results for a user is received, send all results

router.get('/search/:id', searchController.getAllSearches);


module.exports = router;