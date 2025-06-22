const mongoose = require('mongoose');

const jobOpportunitySchema = new mongoose.Schema({
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
  jobType: {
    type: String,
    required: true,
    enum: ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Remote']
  },
  department: {
    type: String,
    required: true,
    enum: ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Product', 'Other']
  },
  category: {
    type: String,
    required: true,
    enum: ['Software Development', 'Web Development', 'Mobile Development', 'Data Science', 'AI/ML', 'DevOps', 'UI/UX Design', 'Digital Marketing', 'Content Writing', 'Project Management', 'Business Analysis', 'Other']
  },
  experience: {
    type: String,
    required: true,
    enum: ['Entry Level (0-1 years)', 'Mid Level (2-5 years)', 'Senior Level (5-10 years)', 'Executive Level (10+ years)', 'Any']
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
  qualifications: [{
    type: String,
    required: true
  }],
  location: {
    type: String,
    required: true // City name or "Remote"
  },
  salary: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    },
    period: {
      type: String,
      enum: ['Annual', 'Monthly', 'Hourly'],
      default: 'Annual'
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
  isRemote: {
    type: Boolean,
    default: false
  },
  applicationsCount: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  companyWebsite: {
    type: String,
    default: ''
  },
  tags: [{
    type: String
  }],
  postedBy: {
    type: String,
    default: 'Admin'
  }
}, {
  timestamps: true
});

// Index for better performance
jobOpportunitySchema.index({ category: 1, isActive: 1 });
jobOpportunitySchema.index({ jobType: 1, isActive: 1 });
jobOpportunitySchema.index({ experience: 1, isActive: 1 });
jobOpportunitySchema.index({ location: 1, isActive: 1 });
jobOpportunitySchema.index({ isFeatured: -1, createdAt: -1 });
jobOpportunitySchema.index({ isUrgent: -1, applicationDeadline: 1 });
jobOpportunitySchema.index({ isRemote: 1, isActive: 1 });

module.exports = mongoose.model('JobOpportunity', jobOpportunitySchema);
