const mongoose = require('mongoose');

const workWithUsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true,
    enum: ['Full Time', 'Part Time', 'Internship', 'Contract', 'Freelance', 'Collaboration']
  },
  department: {
    type: String,
    required: true,
    enum: ['Development', 'Design', 'Marketing', 'Business Development', 'Content', 'Other']
  },
  location: {
    type: String,
    required: true // Remote, Hybrid, City name
  },
  experience: {
    type: String,
    required: true // e.g., "0-2 years", "2-5 years"
  },
  skills: [{
    type: String,
    required: true
  }],
  responsibilities: [{
    type: String,
    required: true
  }],
  requirements: [{
    type: String,
    required: true
  }],
  salary: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'INR'
    },
    negotiable: {
      type: Boolean,
      default: true
    }
  },
  benefits: [{
    type: String
  }],
  applicationLink: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  applicationsCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better performance
workWithUsSchema.index({ jobType: 1, isActive: 1 });
workWithUsSchema.index({ department: 1, isActive: 1 });
workWithUsSchema.index({ deadline: 1, isActive: 1 });
workWithUsSchema.index({ isUrgent: -1, createdAt: -1 });

module.exports = mongoose.model('WorkWithUs', workWithUsSchema);
