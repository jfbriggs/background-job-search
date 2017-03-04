var mongoose = require('mongoose');

var searchSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },

  criteria: {
    type: String,
    required: true
  },

  userId: {
    type: String,
    required: true
  },

  results: [{title: String, company: String, location: String, link: String, description: String}],

  dateCreated: {
    type: Date
  }

});

module.exports = mongoose.model('Search', searchSchema);