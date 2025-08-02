const mongoose = require('mongoose');

const internshipOpportunitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  companyLogo: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true,
    enum: ['Web Development', 'Mobile Development', 'Data Science', 'AI/ML', 'UI/UX Design', 'Digital Marketing', 'Content Writing', 'Graphic Design', 'DevOps', 'Cybersecurity', 'Other']
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
  duration: {
    type: String,
    required: true,
    enum: ['1 Month', '2 Months', '3 Months', '6 Months', '1 Year', 'Flexible']
  },
  mode: {
    type: String,
    required: true,
    enum: ['Remote', 'On-site', 'Hybrid']
  },
  location: {
    type: String,
    required: true // City name or "Remote"
  },
  stipend: {
    amount: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'INR'
    },
    period: {
      type: String,
      enum: ['Monthly', 'Weekly', 'One-time', 'Unpaid'],
      default: 'Monthly'
    }
  },
  eligibility: {
    education: [{
      type: String // e.g., "B.Tech", "BCA", "Any Graduate"
    }],
    year: [{
      type: String,
      enum: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'Any']
    }]
  },
  applicationLink: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  applicationDeadline: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  applicationsCount: {
    type: Number,
    default: 0
  },
  benefits: [{
    type: String
  }],
  tags: [{
    type: String
  }]
}, {
  timestamps: true
});

// Index for better performance
internshipOpportunitySchema.index({ domain: 1, isActive: 1 });
internshipOpportunitySchema.index({ mode: 1, isActive: 1 });
internshipOpportunitySchema.index({ applicationDeadline: 1, isActive: 1 });
internshipOpportunitySchema.index({ isFeatured: -1, createdAt: -1 });
internshipOpportunitySchema.index({ isUrgent: -1, applicationDeadline: 1 });

module.exports = mongoose.model('InternshipOpportunity', internshipOpportunitySchema);
