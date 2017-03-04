var Search = require('./SearchModel.js');
var Q = require('q');

var findSearch = Q.nbind(Search.findOne, Search);
var addSearch = Q.nbind(Search.create, Search);
var findSearches = Q.nbind(Search.find, Search);

module.exports = {
  getAllSearches: function(req, res, next) {
    findSearches({}).then(function(results) {
      if (results) {
        res.json(results);
        next();
      }
    }).fail(function(err) {
      next(err);
    });
  },

  storeResults: function(array, metadata, next) {
    var newData = {
      label: metadata.label,
      criteria: metadata.criteria,
      userId: metadata.user,
      results: array,
      dateCreated: new Date()
    };

    addSearch(newData).then(function(savedSearch) {
      if (savedSearch) {
        next(savedSearch);
        return ('Search results & data saved successfully.');
      }
    }).fail(function(err) {
      console.log('Error saving results:', err);
      next(err);
    });
  }
};