const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@nitdgp\.ac\.in$/,
    unique: true, 
  },
  phone: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
    trim: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: String,
    enum: ["1st", "2nd", "3rd", "4th"],
    required: true,
  },
  course: {
    type: String,
    enum: ["B.Tech", "M.Tech", "PhD", "Other"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Registration", RegistrationSchema);
