var expect = require('chai').expect;
var Search = require('../database/SearchModel.js');
var searchCtrl = require('../database/SearchController.js');
var mongoose = require('mongoose');

describe('Database Tests', function() {
  it ('should pass with flying colors', function() {
    expect(false).to.be.false;
  });

  it ('should properly create search data in the database', function() {
    var searchResults = [
      {title: 'Software Engineer', company: 'Facebook', location: 'San Francisco, CA', link:'http://www.facebook.com/swejob', description: 'Do all the things'},
      {title: 'SWE', company: 'Google', location: 'Mountain View, CA', link: 'http://www.google.com/swejob', description: 'Do more things'}
    ];

    var searchData = {
      label: 'SWE search 2016',
      criteria: 'software engineer san francisco awesome',
      userId: '1aiojsf0924fiofa209',
      results: searchResults,
      dateCreated: new Date()
    }

    Search.create(searchData, function(err, search) {
      if (err) {
        console.log(err);
      }
      console.log(search);
    });


  });
});