const mongoose = require('mongoose');

const WebinarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time:{
    type: String,
    // required: true
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Webinar', WebinarSchema);
