const mongoose = require('mongoose');

const digitalSolutionSchema = new mongoose.Schema({
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
    enum: ['Web Development', 'App Development', 'AI Automation', 'UI/UX Design', 'Digital Marketing', 'Other']
  },
  features: [{
    type: String,
    required: true
  }],
  technologies: [{
    type: String,
    required: true
  }],
  price: {
    startingPrice: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  duration: {
    type: String,
    required: true // e.g., "2-4 weeks"
  },
  image: {
    type: String,
    default: ''
  },
  portfolioLink: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  priority: {
    type: Number,
    default: 0 // Higher number = higher priority in display
  }
}, {
  timestamps: true
});

// Index for better performance
digitalSolutionSchema.index({ category: 1, isActive: 1 });
digitalSolutionSchema.index({ priority: -1 });

module.exports = mongoose.model('DigitalSolution', digitalSolutionSchema);
