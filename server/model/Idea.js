const mongoose = require('mongoose');

const InnovationSchema = new mongoose.Schema({
  innovationType: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true
  },
  teamLeaderEmail: {
    type: String,
    required: true,
    match: /.+\@.+\..+/ 
  },
  teamLeaderName: {
    type: String,
    required: true
  },
  teamLeaderPhone: {
    type: String,
    required: true
  },
  teamLeaderRoll: {
    type: String,
    required: true
  },
  teamMembers: {
    type: Number,
    required: true
  },
  themes: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
},{
  timestamps: true
});

module.exports = mongoose.model('Innovation', InnovationSchema);
