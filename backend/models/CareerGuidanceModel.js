const mongoose = require('mongoose');

const careerGuidanceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true,
    enum: ['Article', 'Video', 'Podcast', 'Webinar', 'Workshop', 'Course', 'Guide', 'Checklist']
  },
  category: {
    type: String,
    required: true,
    enum: ['Resume Building', 'Interview Preparation', 'Skill Development', 'Career Change', 'Freelancing', 'Entrepreneurship', 'Industry Insights', 'Salary Negotiation', 'Work-Life Balance', 'Other']
  },
  targetAudience: {
    type: String,
    required: true,
    enum: ['Students', 'Fresh Graduates', 'Mid-level Professionals', 'Senior Professionals', 'Career Changers', 'All']
  },
  content: {
    type: String,
    required: true // HTML content for articles, embed code for videos
  },
  author: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: ''
    }
  },
  tags: [{
    type: String
  }],
  featuredImage: {
    type: String,
    default: ''
  },
  externalLink: {
    type: String,
    default: '' // For external resources
  },
  duration: {
    type: String,
    default: '' // e.g., "15 min read", "30 min video"
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  publishedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better performance
careerGuidanceSchema.index({ category: 1, isPublished: 1 });
careerGuidanceSchema.index({ targetAudience: 1, isPublished: 1 });
careerGuidanceSchema.index({ isFeatured: -1, publishedDate: -1 });
careerGuidanceSchema.index({ views: -1 });

module.exports = mongoose.model('CareerGuidance', careerGuidanceSchema);
