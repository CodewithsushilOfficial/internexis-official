const mongoose = require('mongoose');

const freelanceProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Web Development', 'Mobile App', 'UI/UX Design', 'AI/ML', 'Data Analysis', 'Digital Marketing', 'Content Writing', 'Other']
  },
  client: {
    name: {
      type: String,
      required: true
    },
    company: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    testimonial: {
      type: String,
      default: ''
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5
    }
  },
  technologies: [{
    type: String,
    required: true
  }],
  projectImages: [{
    type: String
  }],
  liveLink: {
    type: String,
    default: ''
  },
  githubLink: {
    type: String,
    default: ''
  },
  portfolioLink: {
    type: String,
    default: ''
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  duration: {
    type: String,
    required: true // e.g., "2 months", "3 weeks"
  },
  budget: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  status: {
    type: String,
    enum: ['Planning', 'In Progress', 'Under Review', 'Completed', 'On Hold'],
    default: 'Planning'
  },
  projectType: {
    type: String,
    enum: ['Fixed Price', 'Hourly', 'Retainer'],
    required: true
  },
  isShowcase: {
    type: Boolean,
    default: false // Show in portfolio/showcase section
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  challenges: [{
    type: String
  }],
  solutions: [{
    type: String
  }],
  keyFeatures: [{
    type: String
  }],
  completionPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

// Index for better performance
freelanceProjectSchema.index({ status: 1, category: 1 });
freelanceProjectSchema.index({ isFeatured: -1, endDate: -1 });
freelanceProjectSchema.index({ isShowcase: 1, status: 1 });

module.exports = mongoose.model('FreelanceProject', freelanceProjectSchema);
