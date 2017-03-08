var Search = require('./SearchModel.js');
var Q = require('q');

var findSearch = Q.nbind(Search.findOne, Search);
var addSearch = Q.nbind(Search.create, Search);
var findSearches = Q.nbind(Search.find, Search);

module.exports = {
  getAllSearches: function(req, res) {
    findSearches({'userId': req.params.id}).then(function(results) {
      if (results) {
        res.json(results);
      }
    }).fail(function(err) {
      res.sendStatus(400);
    });
  },

  storeResults: function(array, metadata) {
    var newData = {
      label: metadata.label,
      city: metadata.city,
      title: metadata.title,
      email: metadata.email,
      results: array,
      dateCreated: new Date()
    };

    addSearch(newData).then(function(savedSearch) {
      if (savedSearch) {
        console.log('Search results & data saved successfully.');
      }
    }).fail(function(err) {
      console.log('Error saving results:', err);
    });
  }
};