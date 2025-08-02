const mongoose = require('mongoose');

const hackathonEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  organizer: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true,
    enum: ['Hackathon', 'Tech Conference', 'Workshop', 'Competition', 'Meetup', 'Other']
  },
  mode: {
    type: String,
    required: true,
    enum: ['Online', 'Offline', 'Hybrid']
  },
  location: {
    type: String,
    default: '' // Only for offline/hybrid events
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  registrationDeadline: {
    type: Date,
    required: true
  },
  registrationLink: {
    type: String,
    required: true
  },
  prizePool: {
    type: String,
    default: ''
  },
  eligibility: {
    type: String,
    default: ''
  },
  technologies: [{
    type: String
  }],
  image: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Registration Open', 'Registration Closed', 'Ongoing', 'Completed'],
    default: 'Upcoming'
  }
}, {
  timestamps: true
});

// Index for better performance
hackathonEventSchema.index({ startDate: 1, isActive: 1 });
hackathonEventSchema.index({ eventType: 1, status: 1 });
hackathonEventSchema.index({ isFeatured: -1, startDate: 1 });

module.exports = mongoose.model('HackathonEvent', hackathonEventSchema);
