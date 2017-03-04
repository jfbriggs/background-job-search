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
  }
};