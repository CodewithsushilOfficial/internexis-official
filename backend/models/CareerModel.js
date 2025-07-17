const mongoose = require('mongoose');
const validator = require('validator');

const careerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /^[\+]?[1-9][\d]{0,15}$/.test(v);
      },
      message: 'Please provide a valid phone number'
    }
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    enum: [
      'Software Engineer',
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'Mobile App Developer',
      'Data Scientist',
      'AI/ML Engineer',
      'DevOps Engineer',
      'UI/UX Designer',
      'Product Manager',
      'Business Analyst',
      'Quality Assurance Engineer',
      'Cybersecurity Specialist',
      'Digital Marketing Specialist',
      'Content Writer',
      'Graphic Designer',
      'Project Manager',
      'Sales Executive',
      'HR Specialist',
      'Other'
    ]
  },
  resumeLink: {
    type: String,
    required: [true, 'Resume link is required'],
    validate: [validator.isURL, 'Please provide a valid resume URL']
  },
  experience: {
    type: String,
    enum: ['Fresher', '0-1 years', '1-3 years', '3-5 years', '5+ years'],
    default: 'Fresher'
  },
  currentCompany: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  expectedSalary: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  skills: {
    type: [String],
    default: []
  },
  portfolio: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || validator.isURL(v);
      },
      message: 'Please provide a valid portfolio URL'
    }
  },
  linkedinProfile: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || validator.isURL(v);
      },
      message: 'Please provide a valid LinkedIn URL'
    }
  },
  githubProfile: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || validator.isURL(v);
      },
      message: 'Please provide a valid GitHub URL'
    }
  },
  coverLetter: {
    type: String,
    maxlength: [1000, 'Cover letter cannot exceed 1000 characters']
  },
  availability: {
    type: String,
    enum: ['Immediate', '2 weeks', '1 month', '2 months', '3+ months'],
    default: 'Immediate'
  },
  workType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
    default: 'Full-time'
  },
  remoteWork: {
    type: String,
    enum: ['Yes', 'No', 'Hybrid'],
    default: 'Hybrid'
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'interviewed', 'hired', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  reviewedBy: {
    type: String
  },
  interviewDate: {
    type: Date
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
careerSchema.index({ email: 1 });
careerSchema.index({ position: 1 });
careerSchema.index({ status: 1 });
careerSchema.index({ submittedAt: -1 });
careerSchema.index({ experience: 1 });

// Virtual for application age
careerSchema.virtual('applicationAge').get(function() {
  return Math.floor((Date.now() - this.submittedAt) / (1000 * 60 * 60 * 24));
});

// Pre-save middleware
careerSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status !== 'pending') {
    this.reviewedAt = new Date();
  }
  next();
});

// Static method to get statistics
careerSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
  
  const positionStats = await this.aggregate([
    {
      $group: {
        _id: '$position',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);
  
  const total = await this.countDocuments();
  const thisMonth = await this.countDocuments({
    submittedAt: {
      $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    }
  });
  
  return {
    total,
    thisMonth,
    byStatus: stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {}),
    topPositions: positionStats
  };
};

module.exports = mongoose.model('Career', careerSchema);