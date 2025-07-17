const mongoose = require('mongoose');
const validator = require('validator');

const internshipSchema = new mongoose.Schema({
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
    unique: true,
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
  domain: {
    type: String,
    required: [true, 'Domain is required'],
    enum: [
      'Web Development',
      'Mobile App Development',
      'Data Science',
      'Machine Learning',
      'Artificial Intelligence',
      'Cybersecurity',
      'Cloud Computing',
      'DevOps',
      'UI/UX Design',
      'Digital Marketing',
      'Content Writing',
      'Graphic Design',
      'Business Analysis',
      'Project Management',
      'Quality Assurance',
      'Blockchain',
      'IoT (Internet of Things)',
      'Game Development',
      'AR/VR Development',
      'Network Administration'
    ]
  },
  college: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
    minlength: [2, 'College name must be at least 2 characters long'],
    maxlength: [200, 'College name cannot exceed 200 characters']
  },
  year: {
    type: String,
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'Post Graduate'],
    default: '2nd Year'
  },
  course: {
    type: String,
    trim: true,
    maxlength: [100, 'Course name cannot exceed 100 characters']
  },
  duration: {
    type: String,
    enum: ['1 month', '2 months', '3 months', '4 months', '6 months'],
    default: '2 months'
  },
  startDate: {
    type: String,
    enum: ['Immediately', 'Next week', 'Next month', 'After exams', 'Flexible'],
    default: 'Flexible'
  },
  skills: {
    type: [String],
    default: []
  },
  experience: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  motivation: {
    type: String,
    maxlength: [500, 'Motivation cannot exceed 500 characters']
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
  resumeLink: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || validator.isURL(v);
      },
      message: 'Please provide a valid resume URL'
    }
  },
  previousInternships: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  workMode: {
    type: String,
    enum: ['Remote', 'On-site', 'Hybrid'],
    default: 'Remote'
  },
  timeCommitment: {
    type: String,
    enum: ['Part-time (20 hrs/week)', 'Full-time (40 hrs/week)', 'Flexible'],
    default: 'Part-time (20 hrs/week)'
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected', 'completed'],
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
  startedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  mentorAssigned: {
    type: String
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  feedback: {
    type: String,
    maxlength: [1000, 'Feedback cannot exceed 1000 characters']
  },
  certificate: {
    issued: {
      type: Boolean,
      default: false
    },
    issuedAt: {
      type: Date
    },
    certificateId: {
      type: String
    }
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
internshipSchema.index({ email: 1 });
internshipSchema.index({ domain: 1 });
internshipSchema.index({ status: 1 });
internshipSchema.index({ submittedAt: -1 });
internshipSchema.index({ college: 1 });

// Virtual for application age
internshipSchema.virtual('applicationAge').get(function() {
  return Math.floor((Date.now() - this.submittedAt) / (1000 * 60 * 60 * 24));
});

// Virtual for internship duration in days
internshipSchema.virtual('durationInDays').get(function() {
  if (this.startedAt && this.completedAt) {
    return Math.floor((this.completedAt - this.startedAt) / (1000 * 60 * 60 * 24));
  }
  return null;
});

// Pre-save middleware
internshipSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status !== 'pending') {
    this.reviewedAt = new Date();
  }
  
  if (this.isModified('status') && this.status === 'accepted' && !this.startedAt) {
    this.startedAt = new Date();
  }
  
  if (this.isModified('status') && this.status === 'completed' && !this.completedAt) {
    this.completedAt = new Date();
    this.progress = 100;
  }
  
  next();
});

// Static method to get statistics
internshipSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
  
  const domainStats = await this.aggregate([
    {
      $group: {
        _id: '$domain',
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
  
  const completed = await this.countDocuments({ status: 'completed' });
  const active = await this.countDocuments({ status: 'accepted' });
  
  return {
    total,
    thisMonth,
    completed,
    active,
    byStatus: stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {}),
    topDomains: domainStats
  };
};

module.exports = mongoose.model('Internship', internshipSchema);