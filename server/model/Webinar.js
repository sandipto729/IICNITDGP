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
  time: {
    type: String,
    // required: true
  },
  // Additional fields for events
  location: {
    type: String,
    default: 'Online'
  },
  category: {
    type: String,
    enum: ['workshop', 'seminar', 'conference', 'webinar', 'hackathon', 'competition', 'other'],
    default: 'webinar'
  },
  registrationRequired: {
    type: Boolean,
    default: true
  },
  maxParticipants: {
    type: Number,
    default: null
  },
  registrationDeadline: {
    type: String,
    default: null
  },
  contactEmail: {
    type: String,
    default: null
  },
  contactPhone: {
    type: String,
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Webinar', WebinarSchema);
