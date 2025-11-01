const mongoose = require('mongoose');

const AuditionConfigSchema = new mongoose.Schema(
  {
    isOpen: { type: Boolean, default: false },
    message: {
      type: String,
      default:
        'Auditions are currently closed. Please check back later or follow our announcements for updates.',
      maxlength: 500,
    },
    updatedBy: { type: String }, // store user id/email/name (optional)
  },
  { timestamps: true }
);

module.exports = mongoose.model('AuditionConfig', AuditionConfigSchema);
