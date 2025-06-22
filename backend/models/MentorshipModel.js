const mongoose = require('mongoose');

const mentorshipSchema = new mongoose.Schema({
  mentorName: {
    type: String,
    required: true,
    trim: true
  },
  mentorTitle: {
    type: String,
    required: true // e.g., "Senior Software Engineer at Google"
  },
  expertise: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true // e.g., "5+ years"
  },
  company: {
    type: String,
    required: true
  },
  mentorImage: {
    type: String,
    default: ''
  },
  linkedinProfile: {
    type: String,
    default: ''
  },
  sessionTypes: [{
    type: String,
    enum: ['1-on-1 Call', 'Group Session', 'Code Review', 'Career Guidance', 'Technical Interview Prep', 'Resume Review'],
    required: true
  }],
  pricing: {
    sessionPrice: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    },
    duration: {
      type: String,
      required: true // e.g., "60 minutes"
    }
  },
  availability: {
    timezone: {
      type: String,
      required: true
    },
    preferredDays: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }],
    preferredTime: {
      type: String,
      required: true // e.g., "9 AM - 6 PM"
    }
  },
  bookingLink: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 5.0,
    min: 1,
    max: 5
  },
  totalSessions: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  languages: [{
    type: String,
    default: ['English', 'Hindi']
  }]
}, {
  timestamps: true
});

// Index for better performance
mentorshipSchema.index({ expertise: 1, isActive: 1 });
mentorshipSchema.index({ isFeatured: -1, rating: -1 });
mentorshipSchema.index({ 'pricing.sessionPrice': 1 });

module.exports = mongoose.model('Mentorship', mentorshipSchema);
