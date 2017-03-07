var mongoose = require('mongoose');

var searchSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  userId: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  results: [{title: String, company: String, location: String, link: String}],

  description: {
    type: String,
    required: false
  },

  dateCreated: {
    type: Date
  }

});

module.exports = mongoose.model('Search', searchSchema);